'use client'

import { useParams } from "next/navigation"


export default function Test() {
  const params = useParams()
  const noticiaId = params.id

  fetch(`https://jsonplaceholder.typicode.com/todos/${noticiaId}`)
    .then((response) => response.json())
    .then((json) => console.log(json))

  return <div>
    <h1>{noticiaId}</h1>
  </div>
}
