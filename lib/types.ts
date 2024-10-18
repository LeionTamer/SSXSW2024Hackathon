export type ExtractResponsibilitiesType = {
  id: string
  reasoning: string
  responsibilities: { name: string; description: string; id: string }[]
}

export type ResponsibilitiesFulfilledType = {
  comment: string
  fulfilled: boolean | null
  id: string
  name_responsibility: string
}

export interface IAlertData extends ResponsibilitiesFulfilledType {
  title: string
}

export type CheckResponsibilitiesType = {
  reasoning: string
  responsibilities_fulfilled: ResponsibilitiesFulfilledType[]
}

export type CardDetailsType = {
  index: number
  title: string
  details: ExtractResponsibilitiesType
}
