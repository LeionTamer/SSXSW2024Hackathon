'use server'

import { openai } from '@/lib/openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import {
  ResponsibilitiesSchema,
  ResponsibilityType,
  ValidateResponsibilitiesSchema,
} from './_rule-schema'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('ngrok-skip-browser-warning', 'true')

export async function getResponsibilitiesAction(formData: FormData) {
  const file = formData.get('file') as File
  const fileText = await file.text()

  const systemPrompt = `
  You will be provided a job description.
  First, identify the role based on the job description.
  From the job description, identify the responsibilities required for the role.
  Your ouput would be an array of responsibilities each with a unique uuid.

  Sample: [{id: 1234, responsibilities: 'washing dishes'}]
  `
  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: fileText,
      },
    ],
    response_format: zodResponseFormat(
      ResponsibilitiesSchema,
      'responsibilities'
    ),
  })

  const responsibilities =
    completion.choices[0].message.parsed?.responsibilities

  console.log(responsibilities)

  return { responsibilities }
}

export async function validateResponsibilities({
  responsibilities,
  scribe,
}: {
  responsibilities: ResponsibilityType[]
  scribe: string
}) {
  console.table(responsibilities)
  console.log(scribe)

  const systemPrompt = `
  You will be provided a script of a discussion between the manager and the employee.
  First, identify all the responsibilities that were expected from the employee based on the script.
  You will also be provided with a list of responsibilities with corresponding ids: 

  ${responsibilities}

  With each responsibility in the list, check if the employee was able to fulfill the role of the responsibility.
  Your output would be the the ID of the responsibility in list, if the responsibility is fulfilled, and a short reason on how it was fulfilled or not.
  `

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: scribe,
      },
    ],
    response_format: zodResponseFormat(
      ValidateResponsibilitiesSchema,
      'validatedResponsibilities'
    ),
  })

  const validations = completion.choices[0].message.parsed?.validations

  console.table(validations)

  return { validations }
}
