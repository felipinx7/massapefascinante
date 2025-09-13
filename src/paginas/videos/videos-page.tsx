'use client'

import { useEffect, useState } from 'react'
import HeaderInfo from './components/layout/header'
import { useRouter } from 'next/navigation'
import { formatData } from '@/types/FormatDate'
import { DataVideo } from '@/dto/video/DataVideo'
import InputSearch from './components/ui/inputSearch'
import CardVideo from './components/layout/card-video'
import Image from 'next/image'
import { notFoundVideo } from '@/assets/image'
import CardVideoEskeleton from './components/layout/card-video-eskeleton'
import { videoskk } from '@/constants/videos-array'

export default function VideosPage() {
  // State and variables utils in components
  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState(videoskk)
  const videosFilter = videos.filter((video) =>
    video.title.toLowerCase().includes(valueInput.toLowerCase()),
  )
  const router = useRouter()

  //Simulating API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Functions utils in components
  function handleNavigateUniqueVideo() {
    router.push('/teste')
  }

  return (
    <section className="flex h-screen w-full items-start justify-center pt-20">
      {/* Header  */}
      <HeaderInfo title="Hi Evenly, How are you?" />

      {/* content main  */}
      <div className="m-0 flex h-auto w-[100%] max-w-[1280px] flex-col items-start justify-start px-4">
        <InputSearch valueInput={valueInput} handleChangeValueInput={setValueInput} />

        {/* container rendering videos */}
        <div className="mt-10 grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-16 gap-y-3">
          {/* Loading skeleton while loading from api */}
          {loading === false ? (
            videosFilter.length > 0 ? (
              videosFilter.map((card) => (
                <CardVideo
                  key={card.title}
                  title={card.title}
                  duration={card.duration}
                  date_submit={card.date_submit}
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
