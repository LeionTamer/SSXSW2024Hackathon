'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { scribeAtom } from '@/stores/scribeAtom'
import { useSetAtom } from 'jotai'
import { useState } from 'react'

function ContentArea() {
  const [convo, setConvo] = useState('')
  const setScribe = useSetAtom(scribeAtom)

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
      </div>
    </div>
  )
}

export default ContentArea
