import { api } from "../../../config/axios";

export async function DeleteNews(id: string){
    try {
        const res = await api.delete(`/news/${id}`);
        console.log("data: ", res);
        return res.data;
    }catch (error) {
        console.log("Erro ao deletar noticia:", error);
    }
  }