'use client'

import { useEffect, useState } from 'react'
import GameCard from './components/GameCard'

interface Item {
  name: string;
  image: string;
  interest: number;
}

export default function GamePage() {
  const [item1, setItem1] = useState<Item | null>(null)
  const [item2, setItem2] = useState<Item | null>(null)
  const [country, setCountry] = useState('')
  const [category, setCategory] = useState('')
  const [obscure, setObscure] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(0)
  const [score, setScore] = useState(0)

  const fetchNewQuestion = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/data')
      const data = await res.json()
      setItem1(data.item1)
      setItem2(data.item2)
      setCountry(data.country)
      setCategory(data.category)
      setObscure(data.obscure)
      setKey(prev => prev + 1)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewQuestion()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800 text-white">
        <p className="text-2xl">Loading...</p>
      </div>
    )
  }

  return (
    <main className="w-screen h-screen bg-zinc-800">
      {item1 && item2 && (
        <GameCard
        key={key}
        item1={item1}
        item2={item2}
        country={country}
        obscure={obscure}
        score={score}
        onNextAction={fetchNewQuestion} 
        setScoreAction={(newscore: number) => setScore(newscore)} 
      />
      )}
    </main>
  )
}
