'use client'

import VideoSingle from '@/paginas/videos/videoSingle/videoSingle'
import { useParams } from 'next/navigation'

export default function WatchVideo() {
  const params = useParams()
  const id = params.id

  return <VideoSingle />
}
