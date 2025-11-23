import { useNavigate } from "react-router-dom";
import ButtonBack from "./button-back";

interface Props {
  message: string;
}

export default function BigMessage({ message }: Props) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen  text-kanji-foreground font-display px-6 text-center">
      <ButtonBack className="absolute top-6 left-6" />

      <div className="max-w-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          {message}
        </h1>

        <p className="text-lg md:text-xl text mb-10">
          Parece que ya repasaste todos los kanji por ahora.
          ¡Puedes seguir aprendiendo nuevos kanji y avanzar aún más!
        </p>

        <button
          onClick={() => navigate("/new")}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 transition-colors shadow-lg"
        >
          Aprender nuevos kanji
        </button>
      </div>

    </div>
  );
}
