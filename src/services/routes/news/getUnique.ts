import { api } from "../../../config/axios";

export async function GetUniqueNews(id: string){
    
    try{
    const response = await api.get(`/news/${id}`);
    console.log("data: ", response)
    return response.data

    }catch(error){
        console.log("Erro ao pegar noticia:",error)
    }
  }