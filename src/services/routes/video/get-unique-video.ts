import { api } from '@/config/axios'

export default async function GetUniqueVideos(id: string) {
  try {
    const response = await api.get(`video/${id}`)
    console.log('Sucesso ao pegar vídeo', response)
    return response.data
  } catch (error) {
    console.log('Falha ao pegar o vídeo', error)
  }
}
