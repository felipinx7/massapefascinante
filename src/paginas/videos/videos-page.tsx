'use client'

import { useEffect, useState } from 'react'
import HeaderInfo from './components/layout/header'
import InputSearch from './components/ui/inputSearch'
import CardVideo from './components/layout/card-video'
import { notFoundVideo } from '@/assets/image'
import CardVideoEskeleton from './components/layout/card-video-eskeleton'
import GetVideos from '@/services/routes/video/get-videos'
import { videoDTO } from '@/dto/video/DTOVideo'

export default function VideosPage() {
  // State and variables utils in components
  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState<videoDTO[] | []>([])
  const videosFilter =
    videos.length > 0
      ? videos.filter((video: videoDTO) =>
          video.title.toLowerCase().includes(valueInput.toLowerCase()),
        )
      : null


  //API call
  useEffect(() => {
    async function FetchVideos() {
      try {
        const response = await GetVideos()
        setVideos(response.videos)
        setLoading(false)
        console.log('Vídeos da API', videos)
        return response.videos
      } catch (error) {
        console.log('Error ao carregar vídeos', error)
      }
    }

    FetchVideos()
  }, [])

  // Functions utils in components


  return (
    <section className="flex h-screen w-full items-start justify-center pt-20">
      {/* Header  */}
      <HeaderInfo title="Hi Evenly, How are you?" />

      {/* content main  */}
      <div className="m-0 flex h-auto w-[100%] max-w-[1280px] flex-col items-start justify-start px-4">
        <InputSearch valueInput={valueInput} handleChangeValueInput={setValueInput} />

        {/* container rendering videos */}
        <div className="mt-10 grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-16 gap-y-3">
          {/* Loading skeleton while loading data from api */}
          {loading === false ? (
            videosFilter !== null ? (
              videosFilter.map((card) => (
                <CardVideo
                  key={card.id}
                  {...card}
                />
              ))
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <img src={notFoundVideo.src} className="w-[400px]" alt="não encontrado" />
                <p className="text-[1.3rem] font-medium text-primargreen">
                  Ops...Nenhum vídeo encontrado
                </p>
              </div>
            )
          ) : (
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-16">
              {Array.from({ length: 10 }).map((_, index) => (
                <CardVideoEskeleton key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
