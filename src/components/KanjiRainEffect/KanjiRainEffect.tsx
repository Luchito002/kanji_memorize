import './KanjiRainEffect.css';

export default function KanjiRainEffect() {
  const columns = 7;
  const kanjiChars = [
    '日', '本', '学', '生', '語', '愛', '心', '道', '力', '夢',
    '水', '火', '山', '川', '空', '天', '木', '金', '風', '海',
    '人', '時', '雨', '花', '音', '光', '知', '文', '名', '楽',
    '先', '今', '友', '新', '電', '体', '気', '白', '黒', '赤'
  ];
  return (
    <div className="kanji-rain-overlay">
      {[...Array(columns)].map((_, i) => {
        const kanjiCount = 5 + Math.floor(Math.random() * 6);
        const randomKanji = Array.from({ length: kanjiCount }, () =>
          kanjiChars[Math.floor(Math.random() * kanjiChars.length)]
        );
        return (
          <div
            key={i}
            className="kanji-column"
            style={{
              left: `${i * 5}vw`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 5}s`,
            }}
          >
            {randomKanji.map((kanji, j) => (
              <span
                key={j}
                className="kanji-char"
                style={{ animationDelay: `${Math.random() * 5}s` }}
              >
                {kanji}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

