import { api } from '@/config/axios'

export default async function GetUniqueVideos(id: string) {
  try {
    const reponse = await api.get(`video/${id}`)
    console.log('Sucesso ao pegar vídeo', reponse)
    return reponse.data
  } catch (error) {
    console.log('Falha ao pegar o vídeo', error)
  }
}
