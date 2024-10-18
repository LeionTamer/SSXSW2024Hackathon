'use server'

import { apiEndpoint } from '@/lib/consts'

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('ngrok-skip-browser-warning', 'true')

export async function upload_file() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await fetch(`${apiEndpoint}`, {
    headers: myHeaders,
  })

  console.log(response)
}
