import { z } from 'zod'

const ResponsibilitySchema = z.object({
  id: z.string(),
  responsibility: z.string(),
})

export type ResponsibilityType = z.infer<typeof ResponsibilitySchema>

export const ResponsibilitiesSchema = z.object({
  responsibilities: z.array(ResponsibilitySchema),
})

const ValidateResponsibilitySchema = z.object({
  id: z.string(),
  fulfilled: z.boolean().optional(),
  reason: z.string().optional(),
})

export type ValidateResponsibilityType = z.infer<
  typeof ValidateResponsibilitySchema
>

export const ValidateResponsibilitiesSchema = z.object({
  validations: z.array(ValidateResponsibilitySchema),
})
