import { backgroundloginpage } from "@/assets/image"
import { CardNoticiasDTO } from "@/dto/news/DTO-news"
import { baseUrlPhoto } from "@/utils/base-url-photos"

export default function CardNoticiasRelevantes(data: CardNoticiasDTO) {
    const photo = data.photo?.[0]?.url
    ? baseUrlPhoto('news', data.photo[0].url) || backgroundloginpage
    : backgroundloginpage
  return (
    <article className="w-32 flex h-80 cursor-pointer items-start gap-2 transition-all duration-300 ease-in-out hover:scale-105">
        <div className="w-32 h-24 flex" style={{backgroundImage: `url(${photo})`, backgroundSize: "cover"}}></div>
        <div className="flex flex-col w-full h-full">
        <h1 className="line-clamp-2 text-slate-950 font-normal">{data.title}</h1>
        <h1 className="line-clamp-2 text-slate-950 font-normal text-sm">{data.author}</h1>
        </div>
    </article>
  )
}
