'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { alertAtom, scribeAtom } from '@/stores/scribeAtom'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

function ContentArea() {
  const [convo, setConvo] = useState('')
  const setScribe = useSetAtom(scribeAtom)
  const alerts = useAtomValue(alertAtom)

  const disabledAction = convo.length <= 3

  return (
    <div className="col-span-9 gap-4 border-4 border-l-0 border-slate-400 p-5">
      <div className="flex flex-col gap-4">
        <Textarea
          value={convo}
          onChange={(e) => setConvo(e.target.value)}
          rows={30}
        />
        <div className="flex flex-row-reverse">
          <Button disabled={disabledAction} onClick={() => setScribe(convo)}>
            Action
          </Button>
        </div>
        {alerts.map((entry) => {
          const color =
            entry.fulfilled === true
              ? `bg-green-400/20`
              : entry.fulfilled === false
                ? 'bg-red-400/20'
                : 'bg-slate-400/20'
          return (
            <Alert key={entry.id} className={color}>
              <AlertTitle>{entry.title}</AlertTitle>
              <AlertDescription>
                <div>{entry.name_responsibility}</div>
                <div>{entry.comment}</div>
              </AlertDescription>
            </Alert>
          )
        })}
      </div>
    </div>
  )
}

export default ContentArea
