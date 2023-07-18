export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          back_lang: string
          back_text: string
          created_at: string | null
          deck: number
          front_lang: string
          front_text: string
          id: number
          last_completed: string | null
          last_studied: string | null
          next_study: string
        }
        Insert: {
          back_lang: string
          back_text: string
          created_at?: string | null
          deck: number
          front_lang: string
          front_text: string
          id?: number
          last_completed?: string | null
          last_studied?: string | null
          next_study: string
        }
        Update: {
          back_lang?: string
          back_text?: string
          created_at?: string | null
          deck?: number
          front_lang?: string
          front_text?: string
          id?: number
          last_completed?: string | null
          last_studied?: string | null
          next_study?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_deck_fkey"
            columns: ["deck"]
            referencedRelation: "decks"
            referencedColumns: ["id"]
          }
        ]
      }
      decks: {
        Row: {
          base_language: string
          created_at: string | null
          id: number
          name: string
          study_language: string
        }
        Insert: {
          base_language: string
          created_at?: string | null
          id?: number
          name: string
          study_language: string
        }
        Update: {
          base_language?: string
          created_at?: string | null
          id?: number
          name?: string
          study_language?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
