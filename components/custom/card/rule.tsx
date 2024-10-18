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
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { upload_file } from './_rule-action'

function CardRule() {
  const [title, setTitle] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: upload_file,
  })

  function submit() {
    mutate()
  }

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
                  <Input id="picture" type="file" />
                </div>
                <Button disabled={isPending} onClick={() => submit()}>
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
