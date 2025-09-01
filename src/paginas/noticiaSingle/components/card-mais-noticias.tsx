import { backgroundloginpage } from '@/assets/image'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { formatData } from '@/types/FormatDate'
import { baseUrlPhoto } from '@/utils/base-url-photos'

export default function CardNoticiasRelevantes(data: CardNoticiasDTO) {
  const photo = data.photo?.[0]?.url
    ? baseUrlPhoto('news', data.photo[0].url) || backgroundloginpage
    : backgroundloginpage
  return (
    <article className="z-100 flex h-72 w-56 cursor-pointer flex-col items-start gap-2 transition-all duration-300 ease-in-out hover:scale-105">
      <img src={photo} className="flex h-56 w-56 rounded-lg" alt="" />

      <div className="flex h-full w-56 flex-col items-start">
        <h1 className="line-clamp-3 text-sm font-normal text-slate-950">{data.title}</h1>
        <h1 className="line-clamp-1 text-xs font-normal text-slate-950">
          {formatData(data?.date)}
        </h1>
        <h1 className="line-clamp-1 text-xs font-normal text-slate-950">{data.author}</h1>
      </div>
    </article>
  )
}
