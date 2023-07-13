'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function insertCard(formData: FormData) {
  const supabase = createServerComponentClient({ cookies });
  const front = formData.get('front');
  const back = formData.get('back');

  if (!front || !back) {
    throw new Error('Missing form data');
  }

  const { data, error } = await supabase.from('cards').insert({ front, back }).select().single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
