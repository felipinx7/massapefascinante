import { backgroundloginpage } from "@/assets/image"
import { CardNoticiasDTO } from "@/dto/news/DTO-news"
import { formatData } from "@/types/FormatDate"
import { baseUrlPhoto } from "@/utils/base-url-photos"

export default function CardNoticiasRelevantes(data: CardNoticiasDTO) {
    const photo = data.photo?.[0]?.url
    ? baseUrlPhoto('news', data.photo[0].url) || backgroundloginpage
    : backgroundloginpage
  return (
    <article className=" flex z-100  h-72 w-56  cursor-pointer flex-col items-start gap-2 transition-all duration-300 ease-in-out hover:scale-105">
        <div className="w-56 h-56 flex rounded-lg" style={{backgroundImage: `url(${photo})`, backgroundSize: "cover"}}></div>
        <div className="flex flex-col w-56 items-start h-full">
        <h1 className="line-clamp-3 text-slate-950 text-sm font-normal">{data.title}</h1>
        <h1 className="line-clamp-1 text-slate-950 font-normal text-xs">{formatData(data.date)}</h1>
        <h1 className="line-clamp-1 text-slate-950 font-normal text-xs">{data.author}</h1>
        </div>
    </article>
  )
  
}
