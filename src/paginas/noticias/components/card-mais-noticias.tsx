import { cardNoticiasDTO } from '@/dto/noticias/DTO-noticias-card'

export default function CardMaisNoticias(data: cardNoticiasDTO) {
  return (
    <article className="group relative flex w-full cursor-pointer items-start gap-2  transition-all duration-500 ease-in-out hover:scale-105 flex-col justify-between">
      <div className="h-full w-full overflow-clip rounded-[5.97px]">
        <img
          src={data.foto}
          className="h-full w-full rounded-[5.97px] object-cover transition-all duration-500 ease-in-out group-hover:scale-125"
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <p className="text-[0.9rem]">{data.data_de_envio}</p>
        <h1 className="line-clamp-3 font-bold">{data.titulo}</h1>
      </div>
    </article>
  )
}
