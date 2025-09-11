'use client'

import { useState } from 'react'
import HeaderInfo from './components/layout/header'
import { useRouter } from 'next/navigation'
import { formatData } from '@/types/FormatDate'
import { DataVideo } from '@/dto/video/DataVideo'
import InputSearch from './components/ui/inputSearch'
import CardVideo from './components/layout/card-video'
import Image from 'next/image'
import { notFoundVideo } from '@/assets/image'

export default function VideosPage() {
  // State utils in components
  const [valueInput, setValueInput] = useState('')
   const videoskk= [
    { title: 'Introdução ao React', duration: '12:35', date_submit: '2025-01-10' },
    { title: 'Aprendendo TypeScript', duration: '18:22', date_submit: '2025-01-15' },
    { title: 'Clean Architecture no Frontend', duration: '25:41', date_submit: '2025-01-18' },
    { title: 'Tailwind CSS do Zero', duration: '10:57', date_submit: '2025-01-20' },
    { title: 'Consumindo APIs com Axios', duration: '14:19', date_submit: '2025-01-25' },
    { title: 'Validando formulários com React Hook Form', duration: '16:44', date_submit: '2025-01-28' },
    { title: 'Prisma ORM Básico', duration: '21:09', date_submit: '2025-02-01' },
    { title: 'Node.js e Express na Prática', duration: '29:33', date_submit: '2025-02-05' },
    { title: 'Next.js App Router Explicado', duration: '19:27', date_submit: '2025-02-08' },
    { title: 'Criando Layouts Responsivos', duration: '11:13', date_submit: '2025-02-12' },
    { title: 'Autenticação JWT no Node.js', duration: '23:08', date_submit: '2025-02-15' },
    { title: 'Deploy com Vercel', duration: '09:48', date_submit: '2025-02-18' },
    { title: 'Banco de Dados NoSQL vs SQL', duration: '17:55', date_submit: '2025-02-21' },
    { title: 'React + Zustand para estado global', duration: '15:36', date_submit: '2025-02-24' },
    { title: 'Criando Design System com Tailwind', duration: '13:29', date_submit: '2025-02-27' },
    { title: 'Filtragem de Dados em React', duration: '20:02', date_submit: '2025-03-02' },
    { title: 'Estudo de Caso: Dashboard Admin', duration: '22:17', date_submit: '2025-03-06' },
    { title: 'Boas Práticas de Git e GitHub', duration: '08:59', date_submit: '2025-03-09' },
    { title: 'Testes Unitários com Jest', duration: '24:33', date_submit: '2025-03-12' },
    { title: 'Performance no Frontend', duration: '19:12', date_submit: '2025-03-15' },
  ]
  const [videos, setVideos] = useState(videoskk)

  const router  = useRouter()

  // Funtions utils in components
  function handleNavigateUniqueVideo() {
    router.push('/teste')
  }

   const videosFilter = videos.filter((video) => video.title.toLowerCase().includes(valueInput.toLowerCase()))

  const data = new Date()
  console.log(data)
  console.log(videos);
  

  console.log(formatData(data.toISOString()))

  return (
    <section className="flex h-screen w-full items-start justify-center pt-20">
      {/* Header  */}
      <HeaderInfo tittle="Hi Evenly, How are you?" />

      {/* content main  */}
      <div className="m-0 flex items-start justify-start h-auto w-[100%] max-w-[1280px] flex-col px-4">
        <InputSearch valueInput={valueInput} handleChangeValueInput={setValueInput} />

        {/* conatiner renderization videos */}
        <div className="mt-10 w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-16 gap-y-3">
          {videosFilter.length > 0 ? (
            videosFilter.map((card) => (
              <CardVideo
                key={card.title}
                title={card.title}
                duration={card.duration}
                date_sumbit={card.date_submit}
              />
            ))

          ) : (
            <div className='w-full h-full items-center justify-center flex flex-col'>
              <img src={notFoundVideo.src} className='w-[400px]' alt='não encontrado'/>
              <h1 className='text-primargreen text-[1.3rem] font-medium'>Ops...Nenhum vídeo encotrado</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
