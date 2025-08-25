import { newsDTO } from '@/dto/news/DTO-news'
import { api } from '../../../config/axios'

export async function updateNews(data: newsDTO, id: string) {
  try {
    const formData = new FormData()

    formData.append('author', data.author)
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.photoURLs && data.photoURLs.length > 0) {
      data.photoURLs.forEach((file) => {
        formData.append('photoURLs', file)
      })
    }

    const res = await api.put(`/news/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('data: ', res)
    return res.data
  } catch (error) {
    console.log('Erro ao editar noticia:', error)
  }
}
