import CardForm from '@/app/create/card-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default function Home() {
  const supabase = createServerComponentClient({ cookies });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardForm />
    </main>
  );
}
