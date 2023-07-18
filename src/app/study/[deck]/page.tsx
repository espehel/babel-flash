import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { CardSection } from '@/components/CardSection';
import { verify } from '@/utils/verify';
export default async function StudyDeck({ params }: { params: { deck: string } }) {
  const { data: deck, error } = await supabase(cookies).getDeck(parseInt(params.deck));

  if (error) {
    throw new Error(error.message);
  }

  const cardToStudy = deck.cards.at(Math.floor(Math.random() * deck.cards.length));
  verify(cardToStudy, 'No card to study');

  return (
    <main className="main flex justify-center">
      <CardSection card={cardToStudy} />
    </main>
  );
}
