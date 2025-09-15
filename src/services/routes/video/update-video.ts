import { api } from '@/config/axios'
import {  videoSchemaDTO } from '@/dto/video/DTOVideo'

export default async function UpdateVideo(id: string, data: videoSchemaDTO) {
  try {
    const formData = new FormData()
    formData.append('description', data.description)
    formData.append('title', data.title)
    formData.append('videoURL', data.videoURL)
    formData.append('photoURL', data.photoURL)


    const response = await api.put(`/video/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Vídeo atualizado com sucesso', response)
    return response.data
  } catch (error) {
    console.log('Error ao atualizar o vídeo', error)
  }
}
