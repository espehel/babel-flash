'use server';
import { cookies } from 'next/headers';
import { CardInsert } from '@/types/database-types';
import { supabase } from '@/lib/supabase';

export async function insertCard(values: CardInsert, addReverse: boolean) {
  const { data, error } = addReverse
    ? await supabase(cookies).insertCard([
        values,
        {
          ...values,
          back_text: values.front_text,
          front_text: values.back_text,
          front_lang: values.back_lang,
          back_lang: values.front_lang,
        },
      ])
    : await supabase(cookies).insertCard(values);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
