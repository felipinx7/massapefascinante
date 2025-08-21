'use client'

import { useRouter } from 'next/navigation'

export default function Pagina() {
  const router = useRouter()
  const noticias = [
    { id: 1, nome: 'Felipe' },
    { id: 2, nome: 'Felipe Lima' },
    { id: 3, nome: 'Jóse Felipe' },
    { id: 4, nome: 'João Felipe' },
    { id: 5, nome: 'Felipe Souza' },
  ]

  function HandleNavigateRouter(id: number) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((json) => console.log(json))

    router.push(`http://localhost:3000/test/${id}`)
  }

  return (
    <div className="flex h-screen w-ful l flex-col items-center justify-center">
      <div className="flex flex-col items-start gap-4">
        {noticias.map((card) => (
          <article
            onClick={() => HandleNavigateRouter(card.id)}
            className="cursor-pointer p-3"
            key={card.id}
          >
            <h1>{card.nome}</h1>
          </article>
        ))}
      </div>
    </div>
  )
}
