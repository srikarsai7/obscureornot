import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-20 py-10 bg-zinc-900 text-white font-[family-name:var(--font-geist-sans)]">
      
      {/* Logo */}
      <div className="mb-12">
        <Image 
          src="/logo.png" 
          alt="Obscure or Not Logo" 
          width={250} 
          height={100} 
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Content */}
      <main className="text-center max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">Welcome to <span className="text-green-400">Obscure</span> <span className="text-red-400">or Not</span></h1>
        <p className="text-lg sm:text-xl text-zinc-300">
          You will be shown two things. Decide if the left one is <span className="font-semibold text-green-300">less searched</span> than the right one.
          Choose <span className="text-green-500 font-medium">Obscure</span> if you think it is less searched, or <span className="text-red-400 font-medium">Not Obscure</span> if it is more popular in the mentioned country.
        </p>

        <a 
          href="/game" 
          className="inline-block bg-green-600 hover:bg-green-500 transition-colors duration-200 text-white text-xl font-semibold px-8 py-4 rounded-lg shadow-md hover:scale-105"
        >
          Start Game
        </a>
      </main>

      {/* Footer padding */}
      <div className="mt-20 text-sm text-zinc-500">
        Built by Me
      </div>
    </div>
  );
}
