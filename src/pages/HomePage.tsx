import Hero from '@/components/HomePage/Hero';
import Explanation from '@/components/HomePage/Explanation';
import KanjiRainEffect from '@/components/KanjiRainEffect/KanjiRainEffect';

export default function HomePage() {
  return (
    <main className="min-h-screen text-center bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center">
      <Hero />
      <Explanation />
      <KanjiRainEffect />
    </main>
  );
}
