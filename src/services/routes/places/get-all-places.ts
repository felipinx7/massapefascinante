import { api } from '@/config/axios'

export const getAllPlaces = async () => {
  try {
    const response = await api.get('/places')
    return response.data
  } catch (error) {
    console.log('Error ao Pegar todas os Lugares', error)
    return null
  }
}
