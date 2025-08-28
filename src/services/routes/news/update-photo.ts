import { api } from '@/config/axios'

export default async function updatePhoto(id: string, file: File) {
  try {
    const formdata = new FormData()
    formdata.append("photoURLs", file)
    const response = api.put(`/news/photo/${id}`, file, {
      headers: {
        "Accept": "application/json",
      },
    })

    console.log('Atualizada com sucesso!', response)
    return response
  } catch (error) {
    console.log('Error ao atualizar foto', error)
  }
}
