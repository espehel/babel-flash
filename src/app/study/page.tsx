import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import DeckCard from '@/components/DeckCard';
export default async function Study() {
  const { data: decks, error } = await supabase(cookies).getDecks();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="main">
      <ul className="flex gap-4 justify-center flex-wrap">
        {decks.map((deck) => (
          <li key={deck.id}>
            <DeckCard deck={deck} />
          </li>
        ))}
      </ul>
    </main>
  );
}
