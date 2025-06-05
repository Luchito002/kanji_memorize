import LastKanjiLearned from "@/components/MenuPage/LastKanjiLearned";
import QuickAction from "@/components/MenuPage/QuickAction";
import StreakGoal from "@/components/MenuPage/StreakGoal";
import WelcomeProgress from "@/components/MenuPage/WelcomeProgress";
import NavbarApp from "@/components/Navbar/NavbarApp";

export default function MenuPage() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 space-y-10">
      <NavbarApp />

      <WelcomeProgress />

      <LastKanjiLearned />

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <QuickAction icon="🔁" label="Revisar SRS" to="" />
        <QuickAction icon="📘" label="Estudiar kanji" to="/nuevo" />
        <QuickAction icon="📝" label="Test rápido" to="/practicar" />
        <QuickAction icon="📊" label="Ver progreso" to="/progreso" />
      </section>

      <StreakGoal />
    </main>
  );
}

