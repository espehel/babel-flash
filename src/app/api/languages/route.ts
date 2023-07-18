import { NextResponse } from 'next/server';
import { v2 } from '@google-cloud/translate';

export async function GET() {
  const Translator = new v2.Translate({ key: process.env.TRANSLATE_API_KEY });
  const res = await Translator.getLanguages();

  return NextResponse.json(res);
}
