'use server'

import { openai } from '@/lib/openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { ResponsibilitiesSchema } from './_rule-schema'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('ngrok-skip-browser-warning', 'true')

export async function testOpenAI(formData: FormData) {
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

  const responsibilities = completion.choices[0].message.parsed?.responsibilties

  console.log(responsibilities)

  return { responsibilities }
}
