export type ExtractResponsibilitiesType = {
  id: string
  reasoning: string
  responsibilities: { name: string; description: string }[]
}

export type CardDetailsType = {
  index: number
  title: string
  details: ExtractResponsibilitiesType
}
