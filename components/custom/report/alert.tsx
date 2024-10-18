'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { alertAtom } from '@/stores/scribeAtom'
import { useAtomValue } from 'jotai'

function AlertDialog() {
  const alerts = useAtomValue(alertAtom)

  if (alerts.length === 0) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogTitle>Generated Report</DialogTitle>
        <DialogDescription>
          <div className="flex flex-col gap-4">
            {alerts.map((entry) => {
              const color =
                entry.fulfilled === true
                  ? `bg-green-400/20`
                  : entry.fulfilled === false
                    ? 'bg-red-400/20'
                    : 'bg-slate-400/20'
              return (
                <Alert key={entry.id} className={color}>
                  <AlertTitle className="font-bold">{entry.title}</AlertTitle>
                  <AlertDescription>
                    <div>{entry.comment}</div>
                  </AlertDescription>
                </Alert>
              )
            })}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
