import { backgroundloginpage } from "@/assets/image"
import { CardNoticiasDTO } from "@/dto/news/DTO-news"
import { baseUrlPhoto } from "@/utils/base-url-photos"


export default function CardMaisNoticias(data: CardNoticiasDTO) {
  const photo = data.photo?.[0]?.url
    ? baseUrlPhoto('news', data.photo[0].url) || backgroundloginpage
    : backgroundloginpage

  return (
    <article className="group relative flex w-full cursor-pointer items-start gap-2  transition-all duration-500 ease-in-out hover:scale-105 flex-col justify-between">
      <div className="h-full w-full overflow-clip rounded-[5.97px]">
        <img
          src={photo}
          className="h-full w-full rounded-[5.97px] object-cover transition-all duration-500 ease-in-out group-hover:scale-125"
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <h1 className="line-clamp-3 font-bold">{data.title}</h1>
      </div>
    </article>
  )
}
