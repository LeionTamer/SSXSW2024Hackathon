'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function AddCard() {
  //   const [open, setOpen] = useState(false)
  const [, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('Job Description')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Rule</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-5">
        <DialogTitle>Add new entry</DialogTitle>
        <DialogDescription>
          <div className="grid grid-flow-row gap-4">
            <Input
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="grid w-full items-center gap-1.5">
              <Input
                id="documemt input"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <Button
            //   disabled={isPending || !file || !!rules}
            //   onClick={() => mutate()}
            >
              Upload
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddCard
