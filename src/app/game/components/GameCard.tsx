'use client'

import { useState } from 'react'
import Image from 'next/image'
import GameOver from './GameOver'

interface GameCardProps {
  item1: {
    name: string;
    image: string;
  };
  item2: {
    name: string;
    image: string;
  };
  score: number;
  setScoreAction: (newscore: number) => void;
  country: string;
  category: string;
  obscure: boolean;
  onNextAction: () => Promise<void>;
}

export default function GameCard({ item1, item2, score, setScoreAction, country, category, obscure, onNextAction }: GameCardProps) {
  const [isGameOver, setIsGameOver] = useState(false)

  // Handle answer
  const handleAnswer = (selectedObscure: boolean) => {
    if (selectedObscure === obscure) {
      // Correct answer
      setScoreAction(score + 1)
      onNextAction()
    } else {
      // Wrong answer - game over
      setIsGameOver(true)
    }
  }

  // If game is over, render the GameOver component
  if (isGameOver) {
    return <GameOver score={score} />
  }

  return (
    <div className="bg-[#2b2b2b] text-white w-full h-full p-8 flex flex-col items-center justify-between">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
      <img src="/logo.png" alt="Logo" width={300} 
                height={200} className='items-center'/>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-semibold bg-zinc-800 px-6 py-2 rounded-full">
            Score: {score}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl">
        <div className="flex items-center justify-between w-full mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-zinc-800 p-4 rounded-lg shadow-lg mb-4">
              <Image 
                src={item1.image}
                width={300} 
                height={200} 
                alt={item1.name}
                className="rounded object-cover"
              />
            </div>
            <p className="text-xl font-bold">{item1.name}</p>
          </div>
          
          <div className="flex flex-col items-center mx-8">
            <p className="text-2xl font-semibold text-center mb-2">Is searched more than</p>
            <p className="text-xl font-medium text-center">in {country}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-zinc-800 p-4 rounded-lg shadow-lg mb-4">
              <Image 
                src={item2.image}
                width={300} 
                height={200} 
                alt={item2.name}
                className="rounded object-cover"
              />
            </div>
            <p className="text-xl font-bold">{item2.name}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-8 mb-8">
        <button 
          className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-all duration-200 hover:scale-105" 
          onClick={() => handleAnswer(true)}
        >
          Obscure
        </button>
        <button 
          className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-all duration-200 hover:scale-105" 
          onClick={() => handleAnswer(false)}
        >
          Not Obscure
        </button>
      </div>
    </div>
  )
}