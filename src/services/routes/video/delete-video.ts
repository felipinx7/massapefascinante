import { api } from '@/config/axios'

export async function DeleteVideo(id: string) {
  try {
    const response = await api.delete(`/video/${id}`)

    console.log('Vídeo excluído com sucesso!', response)
    return response.data
  } catch (error) {
    console.log('Falha ao excluir um vídeo', error)
  }
}
