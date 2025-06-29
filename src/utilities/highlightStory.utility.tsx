import { Kanji } from "@/types/kanji";

export function highlightStory(story: string, kanji: Kanji) {
  const radicalChars = kanji.radicals;
  const kanjiMeanings = kanji.meaning.toLowerCase().split(/\s+/); // separar palabras como antes

  const highlights: { text: string; className: string }[] = [];

  // Radical characters
  for (const char of radicalChars) {
    highlights.push({ text: char, className: "text-blue-500 font-bold italic" });
  }

  // Kanji meanings
  for (const word of kanjiMeanings) {
    if (word.length >= 2 && story.toLowerCase().includes(word)) {
      highlights.push({ text: word, className: "text-green-600 font-semibold italic" });
    }
  }

  // Remove duplicates and sort by length (desc)
  const uniqueHighlights = Array.from(
    new Map(highlights.map(h => [h.text, h])).values()
  ).sort((a, b) => b.text.length - a.text.length);

  const regex = new RegExp(`(${uniqueHighlights.map(h => escapeRegExp(h.text)).join("|")})`, "gi");
  const parts = story.split(regex);

  return parts.map((part, index) => {
    const match = uniqueHighlights.find(h => part.toLowerCase() === h.text.toLowerCase());
    if (match) {
      return (
        <span key={index} className={match.className}>
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
