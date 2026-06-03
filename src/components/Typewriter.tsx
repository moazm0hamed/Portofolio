import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  delayBetween = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const word = words[currentWordIndex] || '';

    if (isDeleting) {
      // Deleting state
      timer = window.setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      }, deletingSpeed);
    } else {
      // Typing state
      timer = window.setTimeout(() => {
        setCurrentText((prev) => word.substring(0, prev.length + 1));
      }, typingSpeed);
    }

    // Handlers for switching typing/deleting states
    if (!isDeleting && currentText === word) {
      // Finished typing, pause then delete
      timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  // If words is empty, render nothing
  if (words.length === 0) return null;

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="ml-1 w-1 h-4 bg-primary-container animate-ping" id="typewriter-cursor" />
    </span>
  );
}
