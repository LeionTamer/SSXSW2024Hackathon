import CardArea from '@/components/custom/card/area'
import ContentArea from '@/components/custom/content/area'

export default function Home() {
  return (
    <div className="grid-flow-cols grid grid-cols-12">
      <CardArea />
      <ContentArea />
    </div>
  )
}
