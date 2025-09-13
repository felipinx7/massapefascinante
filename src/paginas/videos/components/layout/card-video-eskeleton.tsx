export default function CardVideoEskeleton() {
  return (
    <article className="flex h-[240px] animate-pulse cursor-progress w-[250px] flex-col items-start justify-start gap-2 rounded-lg max-sm:h-[300px] max-sm:w-full">
      {/* container capa do vídeo */}
      <div className="relative min-h-[65%] w-full rounded-md bg-black/10">
        {/* duração do vídeo  */}
        <div className="absolute top-0 flex h-full w-full items-end justify-end p-2">
          <div className="h-3 w-10 rounded-[0.5rem] bg-black/10 p-1">
            <h6 className="text-[0.7rem] font-semibold text-white"></h6>
          </div>
        </div>
      </div>

      {/* titulo do vídeo  */}
      <div className="w-full items-start justify-start">
        <h1 className="bg-black/10 w-[55%] h-3 rounded-lg"></h1>
      </div>

      {/* data do vídeo  */}
      <div className="w-full">
        <h6 className="text-[0.9rem] bg-black/10 h-4 rounded-lg"></h6>
      </div>
    </article>
  )
}
