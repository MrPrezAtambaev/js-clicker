import { useEffect, useState, memo } from "react";

const CODE_SYMBOLS = [
  "{", "}", "(", ")", "[", "]", "<", ">",
  "const", "let", "var", "function", "=>",
  "return", "if", "else", "for", "while",
  "import", "export", "class", "new",
  "async", "await", "try", "catch",
  "true", "false", "null", "undefined",
  "0", "1", ";", ":", "=", "+", "-",
  "git", "npm", "push", "commit",
];

interface CodeDrop {
  id: number;
  text: string;
  left: number;
  duration: number;
  delay: number;
  fontSize: number;
}

function generateDrops(count: number): CodeDrop[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
    left: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    fontSize: 10 + Math.random() * 8,
  }));
}

export const CodeRain = memo(function CodeRain() {
  const [drops, setDrops] = useState<CodeDrop[]>([]);

  useEffect(() => {
    setDrops(generateDrops(30));
  }, []);

  return (
    <div className="code-rain">
      {drops.map((drop) => (
        <span
          key={drop.id}
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            fontSize: `${drop.fontSize}px`,
          }}
        >
          {drop.text}
        </span>
      ))}
    </div>
  );
});
