import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { Card, CardInsert, Deck, DeckInsert, DeckJoined } from '@/types/database-types';
export const supabase = (cookies: () => ReadonlyRequestCookies) => {
  const client = createServerComponentClient({ cookies });
  return {
    getDecks: () => client.from('decks').select('*, cards(*)').returns<Array<DeckJoined>>(),
    getDeck: (id: number) =>
      client.from('decks').select('*, cards(*)').eq('id', id).single<DeckJoined>(),
    insertDeck: (values: DeckInsert) =>
      client.from('decks').insert<DeckInsert>(values).select('*').single<Deck>(),
    insertCard: (values: CardInsert | Array<CardInsert>) =>
      client.from('cards').insert(values).select('*').returns<Array<Card>>(),
  };
};
