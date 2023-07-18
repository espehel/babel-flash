import { Database } from './database-types.generated';

export type Deck = Database['public']['Tables']['decks']['Row'];
export type DeckInsert = Database['public']['Tables']['decks']['Insert'];

export type Card = Database['public']['Tables']['cards']['Row'];
export type CardInsert = Database['public']['Tables']['cards']['Insert'];

export interface DeckJoined extends Deck {
  cards: Card;
}
