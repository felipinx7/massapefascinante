import { api } from "@/config/axios";


export async function GetAllNews(){
    
    try{
    const response = await api.get("/news");
    console.log("data: ", response)
    return response.data

    }catch(error){
        console.log("Erro ao pegar noticias:",error)
    }
  } 
