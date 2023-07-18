import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { getLanguages, insertDeck } from './actions';
import DeckList from '@/components/DeckList';
import LanguageSelect from '@/components/LanguageSelect';
import { verify } from '@/utils/verify';

export default async function Home() {
  const { data, error } = await supabase(cookies).getDecks();
  const [languages] = await getLanguages();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="main">
      <h1 className="text-2xl text-center">Master Languages, One Flash at a Time!</h1>
      <form className="form-control w-fit m-auto mt-4" action={insertDeck}>
        <label className="label">Deck Name</label>
        <input className="input input-bordered input-primary" name="name" />
        <label className="label">Your language</label>
        <LanguageSelect languages={languages} name="inputLanguage" />
        <label className="label">Study language</label>
        <LanguageSelect languages={languages} name="targetLanguage" />
        <button className="btn btn-primary mt-4" type="submit">
          Create deck
        </button>
      </form>
      <div className="flex justify-center mt-8">
        <DeckList decks={data} />
      </div>
    </main>
  );
}
