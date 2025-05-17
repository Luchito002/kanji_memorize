import { useEffect, useRef } from 'react';
import './AppLayout.css';

interface Props {
  count?: number
}

export default function Starfield({ count = 20 }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.textContent = '✶';

      const minTop = 100;
      const maxTop = window.innerHeight - 200;
      const top = Math.random() * (maxTop - minTop) + minTop;

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${top}px`;
      star.style.fontSize = `${Math.random() * 8 + 6}px`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;

      container.appendChild(star);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [count]);
  return <span ref={containerRef} className="starfield dark:flex hidden" />;
};


