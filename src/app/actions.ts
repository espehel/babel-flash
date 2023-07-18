'use server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v2 } from '@google-cloud/translate';
import { verifyString } from '@/utils/verify';

export async function insertDeck(formData: FormData) {
  const name = formData.get('name');
  const base_language = formData.get('inputLanguage');
  const study_language = formData.get('targetLanguage');

  verifyString(name);
  verifyString(base_language);
  verifyString(study_language);

  const { data, error } = await supabase(cookies).insertDeck({
    name,
    base_language,
    study_language,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    return redirect(`/create/${data.id}`);
  }
}

export async function getLanguages() {
  const Translator = new v2.Translate({ key: process.env.TRANSLATE_API_KEY });
  return Translator.getLanguages();
}
