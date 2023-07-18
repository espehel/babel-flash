import CardForm from './card-form';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { getLanguages } from '@/app/actions';
import { CreateCardContextProvider } from '@/contexts/CreateCardContext';

export default async function CreateDeck({ params }: { params: { deck: string } }) {
  const { data, error } = await supabase(cookies).getDeck(parseInt(params.deck));
  const [languages] = await getLanguages();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateCardContextProvider deck={data} languages={languages}>
        <CardForm />
      </CreateCardContextProvider>
    </main>
  );
}
