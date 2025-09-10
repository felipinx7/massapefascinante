'use client'

import { useState } from 'react'
import HeaderInfo from './components/layout/header'
import { useRouter } from 'next/navigation'
import { formatData } from '@/types/FormatDate'
import { DataVideo } from '@/dto/video/DataVideo'

export default function VideosPage() {
  // State utils in components
  const [valueInput, setValueInput] = useState('')
  const [videos, setVideos] = useState<DataVideo| []>([])
  const router = useRouter()

  // Funtions utils in components
  function handleNavigateUniqueVideo() {
    router.push('/teste')
  }

  const data = new Date()
  console.log(data)

  console.log(formatData(data.toISOString()))

  return (
    <section className="flex h-screen w-full flex-col items-start justify-center">
      {/* Header  */}
      <HeaderInfo tittle="Hi Evenly, How are you?" />

      {/* content main  */}
      <div className="m-0 flex h-screen w-full max-w-[1280px] flex-col">
        
      </div>
    </section>
  )
}
