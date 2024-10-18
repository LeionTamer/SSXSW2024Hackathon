'use client'

import { Textarea } from '@/components/ui/textarea'
import { scribeAtom } from '@/stores/scribeAtom'
import { useAtom } from 'jotai'

function ContentArea() {
  const [scribe, setScribe] = useAtom(scribeAtom)
  return (
    <div className="col-span-9 border-4 border-l-0 border-slate-400 p-5">
      <Textarea value={scribe} onChange={(e) => setScribe(e.target.value)} />
    </div>
  )
}

export default ContentArea
