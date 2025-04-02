'use client'

export default function GameOver({ score }: { score: number }) {
  return (
    <div className="bg-[#2b2b2b] w-screen h-screen text-white w-[400px] p-6 rounded-md shadow-lg flex flex-col items-center space-y-6">
      <img src="/logo.png" alt="Logo" width={300} 
                height={200} className='items-center'/>
      <p className="text-lg">Game Over</p>
      <p className="font-semibold">Score: {score}</p>

      <div className="flex gap-4">
        <a href = '/game' className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded">
          Play Again
        </a>
      </div>
    </div>
  )
}