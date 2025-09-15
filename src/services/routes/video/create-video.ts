import { api } from '@/config/axios'
import { videoSchemaDTO } from '@/dto/video/DTOVideo'

export default async function CreateVideo(data: videoSchemaDTO) {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('videoURL', data.videoURL)
    formData.append('photoURL', data.photoURL)
    formData.append('description', data.description)

    const response = await api.post('/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Vídeo criado com sucesso', response)
    return response.data
  } catch (error) {
    console.log('Falha ao criar um vídeo', error)
  }
}
