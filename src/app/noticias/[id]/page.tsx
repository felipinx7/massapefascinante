'use client'

import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { GetUniqueNews } from '@/services/routes/news/getUnique'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UniqueNews() {
  //State utils in section page
  const params = useParams()
  const noticieId = params.id
  const [news, setNews] = useState<CardNoticiasDTO[]>([])

  useEffect(() => {
    async function fetchUniqueNews() {
      try {
        const response = await GetUniqueNews(String(noticieId))
        setNews(response)
        console.log('O id da Noticia é ', response)
      } catch (error) {
        console.log('Error ao pegar o id', error)
      }
    }
    fetchUniqueNews()
  }, [])

  useEffect(() => {
    console.log("O valor do Estado", news);
    
  }, [])

  return (
    <section>
      {news.map((card) => (
        <div key={card.id}>
          <h1>{card.author}</h1>
          <h1>{card.content}</h1>
          <h1>{card.title}</h1>
          <h1>{card.id}</h1>
        </div>
      ))}
    </section>
  )
}
