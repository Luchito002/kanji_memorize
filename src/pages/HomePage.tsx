import Hero from '@/components/HomgePage/Hero';
import Explanation from '@/components/HomgePage/Explanation';

export default function HomePage() {
  return (
    <main className="min-h-screen text-center bg-cover bg-no-repeat bg-center">
      <Hero />
      <Explanation />
    </main>
  );
}
