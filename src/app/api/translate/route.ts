import { NextResponse } from 'next/server';
import { v2 } from '@google-cloud/translate';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');
  const to = searchParams.get('to');

  if (!to || !input) {
    return NextResponse.json({ error: 'Missing query parameters' }, { status: 400 });
  }

  const Translator = new v2.Translate({ key: process.env.TRANSLATE_API_KEY });
  const res = await Translator.translate(input, to);

  return NextResponse.json(res);
}
