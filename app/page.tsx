import CardArea from '@/components/custom/card/area'
import ContentArea from '@/components/custom/content/area'

export default function Home() {
  return (
    <div className="grid grid-flow-col-dense">
      <CardArea />
      <ContentArea />
    </div>
  )
}
