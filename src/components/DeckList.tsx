import Link from 'next/link';
import { Deck, DeckJoined } from '@/types/database-types';

interface Props {
  decks: Array<Deck>;
}

export default function DeckList({ decks }: Props) {
  return (
    <ul>
      {decks.map((deck) => (
        <li key={deck.id}>
          <Link className="link" href={`/create/${deck.id}`}>
            {deck.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
