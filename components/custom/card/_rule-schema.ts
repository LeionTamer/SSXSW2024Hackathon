import { z } from 'zod'

const ResponsibiliySchema = z.object({
  id: z.string(),
  responsibility: z.string(),
})

export type ResponsibiilityType = z.infer<typeof ResponsibiliySchema>

export const ResponsibilitiesSchema = z.object({
  responsibilties: z.array(ResponsibiliySchema),
})
