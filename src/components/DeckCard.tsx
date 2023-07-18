'use client';
import { DeckJoined } from '@/types/database-types';
import { useMemo } from 'react';
import { isLearning, isNew, isToReview } from '@/utils/cards';
import Link from 'next/link';

interface Props {
  deck: DeckJoined;
}
export default function DeckCard({ deck }: Props) {
  const newCards = useMemo(() => deck.cards.filter(isNew).length, [deck]);
  const learning = useMemo(() => deck.cards.filter(isLearning).length, [deck]);
  const toReview = useMemo(() => deck.cards.filter(isToReview).length, [deck]);

  return (
    <div className="card w-96 bg-white shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{deck.name}</h2>
        <div className="flex justify-between items-end">
          <div className="grid grid-cols-2 gap-x-1">
            <div>New:</div>
            <div className="text-blue-600">{newCards}</div>
            <div>Learning:</div>
            <div className="text-red-600">{learning}</div>
            <div>To review:</div>
            <div className="text-green-600">{toReview}</div>
          </div>
          <div className="card-actions">
            <Link href={`/study/${deck.id}`} className="btn btn-primary">
              Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
