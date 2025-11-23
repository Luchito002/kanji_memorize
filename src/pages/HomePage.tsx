import Hero from '@/components/HomePage/Hero';
import Footer from '@/components/HomePage/Footer';
import { NarrativeTechnique, SpacedRepetition, TextGeneration } from '@/components/HomePage/Explanation';

export default function HomePage() {
  return (
    <main className="min-h-screen text-center bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center">
      <Hero />
      <NarrativeTechnique />
      <SpacedRepetition />
      <TextGeneration />
      <Footer />
    </main>
  );
}
