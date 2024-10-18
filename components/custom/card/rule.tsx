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
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { apiEndpoint } from '@/lib/consts'

function CardRule() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  async function submit() {
    if (file) {
      console.log('Uploading file...')

      const formData = new FormData()
      formData.append('file', file)

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch(`${apiEndpoint}/extract_responsibilities`, {
          method: 'POST',
          body: formData,
        })

        const data = await result.json()

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
          <div className="min-h-32 w-full rounded-md border-2 border-solid border-orange-500 bg-orange-300 p-3">
            {title}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              <div className="grid grid-flow-row gap-4">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="title"
                />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    id="documemt input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <Button disabled={isPending || !file} onClick={() => mutate()}>
                  Upload
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">Meow</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardRule
