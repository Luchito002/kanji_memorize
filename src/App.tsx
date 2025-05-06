import BuildKanji from "./components/BuildKanji";
import { ModeToggle } from "./components/mode-toggle";
import NewKanji from "./components/NewKanji";
import { ThemeProvider } from "./components/theme-provider";
import { Kanji } from "./types/kanji";

const exampleKanji: Kanji = {
  character: "見",
  radicals: [
    { character: "目", meanings: ["ojo"] },
    { character: "儿", meanings: ["dos piernas"] }
  ],
  meanings: ["ver", "mirar"],
  examples: ["意見: opinion", "見地: perspectiva"],
  story: "Seguramente, la imagen de “ojo encima de unas piernas” estaba justamente en tu mente esperando para ayudarte a recordar este carácter de ver…. Anda con mucho ojo en distinguir las patas de la almeja saltarina mirar",
  kanjiImages: {
    kanjiStrokeOrder: "https://raw.githubusercontent.com/jcsirot/kanji.gif/refs/heads/master/kanji/gif/150x150/%E8%A6%8B.gif",
    kanjiEasyRemember: ""
  }
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <NewKanji
        kanji={exampleKanji}
      />

      <BuildKanji
        kanji={exampleKanji}
        userKanjiLearned={10}
      />
    </ThemeProvider>
  )
}
