import { api } from '@/config/axios'

export default async function updatePhoto(id: string, file: File) {
  try {
    const formData = new FormData()
    formData.append("photo", file)

    const response = await api.put(`/news/photo/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,  
    })

    console.log("Foto atualizada com sucesso!", response.data)
    return response.data  
  } catch (error) {
    console.error("Erro ao atualizar foto", error)
    throw error
  }
}
