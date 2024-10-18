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
import { ExtractResponsibilitiesType } from '@/lib/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export interface ICardRuleProps {
  title?: string
}

function CardRule({ title = 'Job Description' }: ICardRuleProps) {
  const [file, setFile] = useState<File | null>(null)
  const [rules, setRules] = useState<ExtractResponsibilitiesType | undefined>(
    undefined
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  async function submit() {
    if (file) {
      console.log('Uploading file...')
      console.log(apiEndpoint)

      const formData = new FormData()
      formData.append('file', file)

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch(`${apiEndpoint}/extract_responsibilities`, {
          method: 'POST',
          body: formData,
        })

        const data = (await result.json()) as ExtractResponsibilitiesType
        setRules(data)

        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: submit,
  })

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="min-h-32 w-full rounded-md border-2 border-solid border-slate-500 bg-slate-200 p-3">
            {title}
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
                  disabled={isPending || !file || !!rules}
                  onClick={() => mutate()}
                >
                  Upload
                </Button>
                {!!rules && (
                  <div className="flex flex-col gap-2 p-2">
                    {rules.responsibilities.map((entry, index) => (
                      <div
                        key={index}
                        className="border-1 border-slate-400 bg-slate-400/10 p-2"
                      >
                        {entry.description}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardRule
