'use client'

export default function GameOver({ score }: { score: number }) {
  return (
    <div className="bg-zinc-900 w-screen h-screen text-white w-[400px] p-6 rounded-md shadow-lg flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">
        <span className="text-green-500">Obscure</span> <span className="text-red-500">or Not</span>
      </h1>
      <p className="text-lg">Game Over</p>
      <p className="font-semibold">Score: {score}</p>

      <div className="flex gap-4">
        <a href = '/' className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded">
          Home
        </a>
        <a href = '/game' className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded">
          Play Again
        </a>
      </div>
    </div>
  )
}