import { newsDTO } from "@/dto/news/DTO-news";
import { api } from "../../../config/axios";

export async function createNews(data : newsDTO){
    try {
        const formData = new FormData();

        formData.append("author", data.author);
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("date", data.date);
        data.photoURLs.forEach((file) => {
        formData.append('photoURLs', file)
        })


        const res = await api.post(`/news`, {withCredentials: true, data: FormData});
        console.log("data: ", res);
        return res.data;
    }catch (error) {
        console.log("Erro ao criar noticia:", error);
    }
  }