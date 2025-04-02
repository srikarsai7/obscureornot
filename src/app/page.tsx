import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="center"> Welcome to Obscure or Not</h1>
        <p>If you believe the shown fact is false choose obscure if you believe it's true choose Not Obscure.</p>
        <div className="flex flex-col gap-8">
          <a href="/game" className="btn">
            Start Game
          </a>
        </div>
      </main>
    </div>
  );
}
