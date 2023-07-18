import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import DeckList from '@/components/DeckList';

export default async function Create() {
  const { data } = await supabase(cookies).getDecks();

  if (!data?.length) {
    return <p>No decks</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DeckList decks={data} />
    </main>
  );
}
