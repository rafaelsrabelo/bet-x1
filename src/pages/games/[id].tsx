import { useRouter } from 'next/router'

export default function Game() {
  const { query } = useRouter()

  return (
    <>
      <h1>Detalhes do jogo: {JSON.stringify(query)}</h1>
    </>
  )
}