interface CardVideoProps {
  duration: string
  date_sumbit: string
  title: string
}

export default function CardVideo(data: CardVideoProps) {
  return (
    <article className="flex h-[240px] max-sm:h-[300px] w-[250px] max-sm:w-full cursor-pointer flex-col items-start justify-start gap-1">
      {/* Container capa do video  */}
      <div className="relative min-h-[65%] w-full rounded-md bg-primargreen">
        <h1>{data.title}</h1>

        {/* duração do vídeo  */}
        <div className="absolute top-0 flex h-full w-full items-end justify-end p-2">
          <div className="w-auto rounded-[0.5rem] bg-black/70 p-1">
            <h6 className="text-[0.7rem] font-semibold text-white">{data.duration}</h6>
          </div>
        </div>
      </div>

      {/* titulo do vídeo  */}
      <div className="w-full items-start justify-start">
        <h1 className="line-clamp-2 font-[500]">{data.title}</h1>
      </div>

      {/* data do vídeo  */}
      <div>
        <h6 className="text-[0.9rem]">{data.date_sumbit}</h6>
      </div>
    </article>
  )
}
