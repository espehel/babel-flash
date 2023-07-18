'use client';
import { Card } from '@/types/database-types';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  card: Card;
}
export function CardSection({ card }: Props) {
  const router = useRouter();
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    setShowFront(true);
  }, [card]);

  const handleTurnCard = useCallback(() => {
    setShowFront(false);
  }, []);

  const handleNextCard = useCallback(() => {
    router.refresh();
  }, [router]);

  if (showFront) {
    return (
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title mb-4">{card.front_text}</h2>
          <div className="card-actions justify-center">
            <button onClick={handleTurnCard} className="btn btn-primary">
              Show answer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-white shadow-xl">
      <div className="card-body items-center">
        <h2 className="card-title">{card.back_text}</h2>
        <div className="card-actions justify-center">
          <button onClick={handleNextCard} className="btn btn-primary">
            Again
          </button>
          <button onClick={handleNextCard} className="btn btn-primary">
            Hard
          </button>
          <button onClick={handleNextCard} className="btn btn-primary">
            Easy
          </button>
        </div>
      </div>
    </div>
  );
}
