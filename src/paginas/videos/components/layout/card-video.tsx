'use client'

import { videoDTO } from '@/dto/video/DTOVideo'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'

export default function CardVideo(data: videoDTO) {
  // variaveis utilzidas no componente
  const photo = baseUrlPhoto('thumbnails', data.photoURL)
  const dataFormatada = formatDate(data.createdAt ?? '')
  const durationFormatada = FormatedDuration(String(data.duration))
  const router = useRouter()

  // funções utilizadas no componente
  function FormatedDuration(duration: string) {
    const durationNumber = Number(duration)

    const horas = Math.floor(durationNumber / 3600)
    const minutos = Math.floor((durationNumber % 3600) / 60)
    const segundos = (durationNumber % 60).toFixed(0)

    const horasFormatada = String(horas).padStart(2, '0')
    const MinutosFormatado = String(minutos).padStart(2, '0')
    const SegundosFormatado = String(segundos).padStart(2, '0')

    return `${horasFormatada}:${MinutosFormatado}:${SegundosFormatado}`
  }

  function handleNavigateVideoUnique(id: string){
    router.push(`videos/watch/${id}`)
  }

  return (
    <article
      onClick={() => handleNavigateVideoUnique(data.id)}
      className="flex h-[240px] w-[250px] cursor-pointer flex-col items-start justify-start gap-1 max-sm:h-[300px] max-sm:w-full"
    >
      {/* Container capa do video  */}
      <div className="relative min-h-[65%] w-full rounded-md bg-primargreen">
        <img src={photo} alt="" />

        {/* duração do vídeo  */}
        <div className="absolute top-0 flex h-full w-full items-end justify-end p-2">
          <div className="w-auto rounded-[0.5rem] bg-black/70 p-1">
            <h6 className="text-[0.7rem] font-semibold text-white">{durationFormatada}</h6>
          </div>
        </div>
      </div>

      {/* titulo do vídeo  */}
      <div className="w-full items-start justify-start">
        <h1 className="line-clamp-2 font-[500]">{data.title}</h1>
      </div>

      {/* data do vídeo  */}
      <div>
        <h6 className="text-[0.9rem]">{dataFormatada}</h6>
      </div>
    </article>
  )
}
