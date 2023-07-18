import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { Card, CardInsert, Deck, DeckInsert } from '@/types/database-types';
import { util } from 'protobufjs';
import Array = util.Array;
export const supabase = (cookies: () => ReadonlyRequestCookies) => {
  const client = createServerComponentClient({ cookies });
  return {
    getDecks: () => client.from('decks').select('*').returns<Array<Deck>>(),
    getDeck: (id: number) => client.from('decks').select('*, cards(*)').eq('id', id).single<Deck>(),
    insertDeck: (values: DeckInsert) =>
      client.from('decks').insert<DeckInsert>(values).select('*').single<Deck>(),
    insertCard: (values: CardInsert | Array<CardInsert>) =>
      client.from('cards').insert(values).select('*').returns<Array<Card>>(),
  };
};
