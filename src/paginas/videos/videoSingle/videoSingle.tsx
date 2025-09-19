import { useEffect, useState } from 'react'
import CardVideo from '../components/layout/card-video'
import CardVideoEskeleton from '../components/layout/card-video-eskeleton'
import HeaderInfo from '../components/layout/header'
import ViewVideoEskeleton from '../components/layout/view-video-eskeleton'
import { videoDTO } from '@/dto/video/DTOVideo'
import { useParams } from 'next/navigation'
import GetUniqueVideos from '@/services/routes/video/get-unique-video'
import GetVideos from '@/services/routes/video/get-videos'

export default function VideoSingle() {
  const [loading, setLoading] = useState(true)
  const [video, setVideo] = useState<videoDTO | null>(null)
  const [allVideos, setAllVideos] = useState<videoDTO[] | []>([])
  const videoURL = video?.url?.split(" ").join()
  const params = useParams()
  // const DataFormatada = formatDate(video?.createdAt ?? '')
  const VideoId = params.id

  useEffect(() => {
    async function FetchVideoSingle() {
      try {
        const response = await GetUniqueVideos(String(VideoId))
        console.log('Id convertido em string', String(VideoId))
        console.log('Vídeo Carregado com sucesso', response.video)
        setLoading(false)
        setVideo(response.video)
        return response.video
      } catch (error) {
        console.log('Error ao pegar o vídeo', error)
      }
    }

    async function FetchAllVideos() {
      try {
        const response = await GetVideos()
        console.log('Todos os vídeos pegados com sucesso', response)
        setAllVideos(response.videos)
        setLoading(false)
        return response
      } catch (error) {
        console.log('Error ao pegar todos os vídeos', error)
      }
    }

    FetchVideoSingle()
    FetchAllVideos()
  }, [])
  console.log("DADOS DO ESTADO", video)
  return (
    <section className="flex h-screen w-full items-start justify-center pt-24">
      <HeaderInfo title="Hi Evenly, How are you?" />

      {/* container principal  */}
      <div className="items- m-0 flex w-[100%] max-w-[1280px] flex-col justify-center gap-6">
        {loading === false ? (
          //  container dos vídeo carregado
          <>
            <div className="flex w-full flex-col gap-4">
              {/* video  */}
              <div className="h-[600px] w-full rounded-xl bg-primargreen max-md:h-[350px] max-md:rounded-none">
                <video className="h-full w-full object-cover" controls>
                  <source src={`https://api.massapefascinante.com.br/videos/${videoURL}`} />
                </video>
              </div>

              {/* informações vídeos  */}
              <div className="px-4">
                <h1 className="line-clamp-2 text-[1.5rem]">{video?.title}</h1>
                <p className="text-[1rem] font-bold">{video?.createdAt}</p>
              </div>
            </div>

            {/* container dos outros vídeos  */}
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(240px,1fr))] place-items-center gap-4">
              {allVideos
                .filter((card) => card.id !== VideoId)
                .map((card) => (
                  <CardVideo key={card.title} {...card} createdAt={card.createdAt} />
                ))}
            </div>
          </>
        ) : (
          //  container dos vídeo carregando
          <>
            <ViewVideoEskeleton />

            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(240px,1fr))] place-items-center gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <CardVideoEskeleton key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
