import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export default async function Study() {
  const supabase = createServerComponentClient({ cookies });
  const { data: cards } = await supabase.from('cards').select();
  return (
    <main>
      <ul>{cards?.map((card) => <li key={card.id}>{`${card.front} -> ${card.back}`}</li>)}</ul>
    </main>
  );
}
