import CardVideo from '../components/layout/card-video'
import HeaderInfo from '../components/layout/header'


export default function VideoSingle() {
  const videoskk = [
    { title: 'Introdução ao React', duration: '12:35', date_submit: '2025-01-10' },
    { title: 'Aprendendo TypeScript', duration: '18:22', date_submit: '2025-01-15' },
    { title: 'Clean Architecture no Frontend', duration: '25:41', date_submit: '2025-01-18' },
    { title: 'Tailwind CSS do Zero', duration: '10:57', date_submit: '2025-01-20' },
    { title: 'Consumindo APIs com Axios', duration: '14:19', date_submit: '2025-01-25' },
    {
      title: 'Validando formulários com React Hook Form',
      duration: '16:44',
      date_submit: '2025-01-28',
    },
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
  return (
    <section className="flex h-screen w-full items-start justify-center pt-24">
      <HeaderInfo tittle="Hi Evenly, How are you?" />

      {/* container principal  */}
      <div className="items- m-0 flex w-[100%] max-w-[1280px] flex-col justify-center gap-6">
        {/* container do vídeo  */}
        <div className="flex w-full flex-col gap-4">
          {/* video  */}
          <div className="h-[600px] max-md:h-[350px] w-full rounded-xl max-md:rounded-none bg-primargreen">
                <video className='h-full w-full object-cover' controls> 
                  <source src="https://api.massapefascinante.com.br/videos/1416529-sd_640_360_30fps.mov" /> 
                </video>
          </div>

          {/* informações vídeos  */}
          <div className='px-4'>
            <h1 className="line-clamp-2 text-[1.5rem]">
              Ocorrem Chuvas Fortes na comunidade de cachimbinha, coisa que causou grande alegria
              aos moradores locais
            </h1>
            <p className="text-[1rem] font-bold">09/09/2029</p>
          </div>
        </div>

        {/* container dos outros vídeos  */}
        <div className="grid w-full px-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {videoskk.map((card) => (
            <CardVideo key={card.title} {...card} date_sumbit={card.date_submit} />
          ))}
        </div>
      </div>
    </section>
  )
}
