import { api } from '@/config/axios'

export default async function updatePhoto(id: string, data: string | null) {
  try {
    const response = api.put(`/news/photo/${id}`, data, {
      headers: {
        'content-type': 'multpart-formdata',
      },
    })

    console.log('Atualizada com sucesso!', response)
    return response
  } catch (error) {
    console.log('Error ao atualizar foto', error)
  }
}
