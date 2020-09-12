import axios from "axios"

type HttpSectionResultInput = {
  query: string //
  baseUrl: string //
  params: {}
}

export default async function getHttpSectionResult({
  query,
  baseUrl,
  params,
}: HttpSectionResultInput) {
  const apiClient = axios.create({
    baseURL: baseUrl,
    responseType: "json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  try {
    for (var key in params) {
      if (!key) continue
      query = query.replace("$" + key, params[key])
    }
    let response = await apiClient.get(query)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
