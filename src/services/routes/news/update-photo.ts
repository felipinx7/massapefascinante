import { api } from '@/config/axios'

export default async function updatePhoto(id: string, file: File) {
  try {
    const response = await api.put(`/news/photo/${id}`, file, {
        headers: {
        "Content-Type": "multipart/form-data",
        withCredencials: true
    }
    })

    console.log('Atualizada com sucesso!', response)
    return response
  } catch (error) {
    console.log('Error ao atualizar foto', error)
  }
}
