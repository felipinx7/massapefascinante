import { api } from '@/config/axios'

export default async function GetVideos() {
  try {
    const response = await api.get('/video')
    console.log('Vídeos pagados com sucesso', response)
    return response.data
  } catch (error) {
    console.log('Error ao pegar vídeos', error)
  }
}
