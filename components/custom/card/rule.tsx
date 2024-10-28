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
import { IAlertData } from '@/lib/types'
import { alertAtom, scribeAtom } from '@/stores/scribeAtom'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import {
  getResponsibilitiesAction,
  validateResponsibilities,
} from './_rule-action'
import { ResponsibilityType } from './_rule-schema'

export interface ICardRuleProps {
  title?: string
}

function CardRule({ title = 'Job Description' }: ICardRuleProps) {
  const [file, setFile] = useState<File | null>(null)

  const [responsibilities, setResponsibilities] = useState<
    ResponsibilityType[]
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
    mutate: responsibilitiesMutate,
    isPending: responsibilitiesLoading,
    data: jobDetails,
  } = useMutation({
    mutationFn: getResponsibilitiesAction,
  })

  function getResponsibilities() {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
      responsibilitiesMutate(formData)
    }
  }

  const { mutate: validate } = useMutation({
    mutationFn: validateResponsibilities,
    onSuccess(data) {
      console.table(data)
      const alertData = data.validations!.map((entry) => {
        const reference = jobDetails?.responsibilities!.find(
          (rule) => rule.id === entry.id
        )

        return {
          title: reference?.responsibility,
          comment: entry.reason || '',
          id: entry.id,
          fulfilled: entry.fulfilled,
        } as IAlertData
      })

      setAlert(alertData)

      setSorted({
        fulfilled: data
          .validations!.filter((item) => item.fulfilled === true)
          .map((item) => item.id),
        unfulfilled: data
          .validations!.filter((item) => item.fulfilled === false)
          .map((item) => item.id),
      })
    },
  })

  const rulesList = !jobDetails ? null : (
    <span className="mt-4 flex max-h-[80vh] flex-col gap-2 overflow-y-auto py-2">
      {jobDetails.responsibilities!.map((entry) => {
        const color = !!sorted
          ? sorted.fulfilled.includes(entry.id)
            ? 'bg-green-400/20'
            : sorted.unfulfilled.includes(entry.id)
              ? 'bg-red-400/20'
              : 'bg-slate-400/20'
          : 'bg-slate-400/20'
        return (
          <span
            key={entry.id}
            className={`border-1 border-slate-400 ${color} p-2`}
          >
            {entry.responsibility}
          </span>
        )
      })}
    </span>
  )

  useEffect(() => {
    console.table(jobDetails?.responsibilities)
    setResponsibilities(jobDetails?.responsibilities || [])
  }, [jobDetails])

  useEffect(() => {
    if (!!jobDetails?.responsibilities && scribe.length >= 3) {
      console.log('I was called')
      validate({
        responsibilities: jobDetails?.responsibilities,
        scribe,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scribe])

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <span className="min-h-12 w-full rounded-md border-2 border-solid border-slate-500 bg-slate-200 p-3">
              {title}
            </span>
            {!!rulesList && <span>{rulesList}</span>}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="m-3">{title}</DialogTitle>
            <DialogDescription>
              <span className="grid grid-flow-row">
                <span className="grid w-full items-center gap-1.5">
                  <Input
                    id="documentInput"
                    type="file"
                    onChange={handleFileChange}
                  />
                </span>

                <Button
                  disabled={
                    responsibilitiesLoading ||
                    !file ||
                    responsibilities.length >= 1
                  }
                  onClick={() => getResponsibilities()}
                >
                  Upload Job description
                </Button>
                {rulesList}
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardRule
