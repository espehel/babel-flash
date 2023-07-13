'use client';
import { useCallback, useState } from 'react';
import { insertCard } from './insert-card';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function CardForm() {
  const [inputText, setInputText] = useState('');
  const [targetText, setTargetText] = useState('');

  const translate = useCallback(async () => {
    const res = await fetch(`/api/translate?input=${inputText}&to=${'en'}`);
    const [target] = await res.json();
    setTargetText(target);
  }, [inputText]);

  const handleFormAction = useCallback(async (formData) => {
    await insertCard(formData);
    setInputText('');
    setTargetText('');
    toast.success(<Link href="/study">New card created</Link>);
  }, []);

  return (
    <form className="flex flex-col gap-4 w-3/4" action={handleFormAction}>
      <div className="flex gap-4">
        <label className="label">
          Front
          <textarea
            name="front"
            className="textarea"
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
          />
        </label>
        <label className="label">
          Back
          <textarea
            name="back"
            className="textarea"
            value={targetText}
            onChange={(e) => setTargetText(e.currentTarget.value)}
          />
        </label>
      </div>
      <div className="flex gap-4">
        <button className="button" type="button" onClick={translate}>
          Translate
        </button>
        <button className="button" type="submit">
          Create card
        </button>
      </div>
    </form>
  );
}
