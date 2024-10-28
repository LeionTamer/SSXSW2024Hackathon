import { z } from 'zod'

const ResponsibilitySchema = z.object({
  id: z.string(),
  responsibility: z.string(),
})

export type ResponsibilityType = z.infer<typeof ResponsibilitySchema>

export const ResponsibilitiesSchema = z.object({
  responsibilities: z.array(ResponsibilitySchema),
})
