'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { apiEndpoint } from '@/lib/consts'
import {
  CheckResponsibilitiesType,
  ExtractResponsibilitiesType,
  IAlertData,
} from '@/lib/types'
import { alertAtom, scribeAtom } from '@/stores/scribeAtom'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { testOpenAI } from './_rule-action'
import { ResponsibiilityType } from './_rule-schema'

export interface ICardRuleProps {
  title?: string
}

function CardRule({ title = 'Job Description' }: ICardRuleProps) {
  const [file, setFile] = useState<File | null>(null)
  const [rules] = useState<ExtractResponsibilitiesType | undefined>(undefined)

  const [responsibilities, setResponsibilities] = useState<
    ResponsibiilityType[]
  >([])

  const [sorted, setSorted] = useState<
    { fulfilled: string[]; unfulfilled: string[] } | undefined
  >()
  const setAlert = useSetAtom(alertAtom)

  const scribe = useAtomValue(scribeAtom)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const {
    mutate: responsibiilitiesMutate,
    isPending: responsibilitiesLoading,
    data: jobDetails,
  } = useMutation({
    mutationFn: testOpenAI,
  })

  function getResponsibillities() {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
      responsibiilitiesMutate(formData)
    }
  }

  async function validateFn() {
    try {
      const result = await fetch(`${apiEndpoint}/check_responsibilities`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          transcript: scribe,
          all_responsibilities: rules!.responsibilities,
        }),
      })

      const data = (await result.json()) as CheckResponsibilitiesType

      console.table(data)

      const alertData = data.responsibilities_fulfilled.map((entry) => {
        const reference = rules?.responsibilities.find(
          (rule) => rule.id === entry.id
        )
        return {
          title: reference?.description,
          ...entry,
        } as IAlertData
      })
      setAlert(alertData)

      const fulfilled = data.responsibilities_fulfilled
        .filter((entry) => entry.fulfilled === true)
        .map((entry) => entry.id)

      console.table(fulfilled)

      setSorted({
        fulfilled,
        unfulfilled: data.responsibilities_fulfilled
          .filter((entry) => entry.fulfilled === false)
          .map((entry) => entry.id),
      })

      console.log(sorted)
    } catch (error) {
      console.error(error)
    }
  }

  const { mutate: validate } = useMutation({
    mutationFn: validateFn,
  })

  const rulesList = !rules ? null : (
    <div className="flex max-h-[80vh] flex-col gap-2 overflow-y-auto p-2">
      {rules.responsibilities.map((entry) => {
        const color = !!sorted
          ? sorted.fulfilled.includes(entry.id)
            ? 'bg-green-400/20'
            : sorted.unfulfilled.includes(entry.id)
              ? 'bg-red-400/20'
              : 'bg-slate-400/20'
          : 'bg-slate-400/20'
        return (
          <div
            key={entry.id}
            className={`border-1 border-slate-400 ${color} p-2`}
          >
            {entry.description}
          </div>
        )
      })}
    </div>
  )

  useEffect(() => {
    console.table(jobDetails?.responsibilities)
    setResponsibilities(jobDetails?.responsibilities || [])
  }, [jobDetails])

  useEffect(() => {
    if (!!rules && scribe.length >= 3) {
      console.log('I was called')
      validate()
    }
  }, [scribe])

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="min-h-12 w-full rounded-md border-2 border-solid border-slate-500 bg-slate-200 p-3">
            {title}
            {rulesList}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="my-3">{title}</DialogTitle>
            <DialogDescription>
              <div className="grid grid-flow-row gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Input
                    id="documemt input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>

                <Button
                  disabled={
                    responsibilitiesLoading ||
                    !file ||
                    responsibilities.length >= 1
                  }
                  onClick={() => getResponsibillities()}
                >
                  Upload Job description
                </Button>
                {rulesList}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardRule
