import { CardNoticiasDTO } from "@/dto/news/DTO-news";

export default function CardNews(data: CardNoticiasDTO){
  return(
    <article>
      <h1>{data.author}</h1>
      <h1>{data.content}</h1>
      <h1>{data.title}</h1>
    </article>
  )
}