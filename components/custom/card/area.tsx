'use client'

import { bodyHeightStyle } from '@/lib/consts'
import CardRule from './rule'
// import AddCard from './add'

function CardArea() {
  return (
    <div
      className="w-xl col-span-3 flex flex-col gap-5 border-4 border-slate-400 p-5"
      style={{ height: bodyHeightStyle }}
    >
      <CardRule />
      {/* <AddCard /> */}
    </div>
  )
}

export default CardArea
