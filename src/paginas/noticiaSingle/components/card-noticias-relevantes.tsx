import { CardNoticiasDTO } from "@/dto/news/DTO-news"

export default function CardNoticiasRelevantes(data: CardNoticiasDTO) {
  return (
    <article className="group relative cursor-pointer flex items-start justify-start gap-2 max-lg:flex-col max-lg:justify-between">
      <div className="h-[100px] overflow-clip w-[250px] rounded-[5.97px] max-lg:h-auto">
        <img
          src={data.photoURLs[0].url}
          className="max-h-[100px] group-hover:scale-125 duration-500 transition-all max-w-[250px] rounded-lg object-cover ease-in-out hover:scale-105 max-lg:max-h-none max-lg:w-full max-lg:max-w-none"
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <p className="text-[0.9rem]">{data.date}</p>
        <h1 className="line-clamp-3 font-bold">{data.title}</h1>
      </div>
    </article>
  )
}
