import { json } from "stream/consumers";
import { api } from "../../../config/axios";

export async function DeleteNews(id: string | undefined) {
    try {
        const json = {};
        const res = await api.delete(`/news/${id}`, json );
        console.log("data: ", res);
        return res.data;
    }catch (error) {
        console.log("Erro ao deletar noticia:", error);
    }
  }