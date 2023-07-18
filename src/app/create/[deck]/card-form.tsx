'use client';
import { useCallback } from 'react';
import { insertCard } from './actions';
import { toast } from 'react-toastify';
import Link from 'next/link';
import moment from 'moment';
import TranslationArea from '@/components/TranslationArea';
import LanguageSelectLabel from '@/components/LanguageSelectLabel';
import { useCreateCardContext } from '@/contexts/CreateCardContext';
export default function CardForm() {
  const {
    inputText,
    setInputText,
    targetText,
    setTargetText,
    inputLanguage,
    setInputLanguage,
    targetLanguage,
    setTargetLanguage,
    deck,
  } = useCreateCardContext();

  const translateToTarget = useCallback(async () => {
    const res = await fetch(
      `/api/translate?input=${inputText}&from=${inputLanguage}&to=${targetLanguage}`
    );
    const [target] = await res.json();
    setTargetText(target);
  }, [inputText, inputLanguage, targetLanguage]);

  const translateToInput = useCallback(async () => {
    const res = await fetch(
      `/api/translate?input=${targetText}&from=${targetLanguage}&to=${inputLanguage}`
    );
    const [target] = await res.json();
    setInputText(target);
  }, [targetText, targetLanguage, inputLanguage]);

  const handleFormAction = useCallback(
    async (formData: FormData) => {
      const addReverse = Boolean(formData.get('reverse'));
      await insertCard(
        {
          front_text: inputText,
          back_text: targetText,
          deck: deck.id,
          back_lang: 'en',
          front_lang: 'no',
          next_study: moment().add(1, 'day').toISOString(),
        },
        addReverse
      );
      setInputText('');
      setTargetText('');
      addReverse
        ? toast.success(
            <div>
              <Link href="/study">2 new cards created</Link>
            </div>
          )
        : toast.success(
            <div>
              <Link href="/study">New card created</Link>
            </div>
          );
    },
    [inputText, targetText, deck]
  );

  return (
    <form className="flex flex-col gap-4 w-3/4" action={handleFormAction}>
      <div className="flex items-end gap-4">
        <div>
          <LanguageSelectLabel
            label="Front"
            name="front-select"
            code={inputLanguage}
            onLanguageChange={setInputLanguage}
          />
          <TranslationArea name="front" value={inputText} onChange={setInputText} />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <button className="btn btn-outline btn-sm" type="button" onClick={translateToTarget}>
            {'>>>'}
          </button>
          <button className="btn btn-outline btn-sm" type="button" onClick={translateToInput}>
            {'<<<'}
          </button>
        </div>
        <div>
          <LanguageSelectLabel
            label="Back"
            name="back-select"
            code={targetLanguage}
            onLanguageChange={setTargetLanguage}
          />
          <TranslationArea name="back" value={targetText} onChange={setTargetText} />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="label cursor-pointer">
          <span className="label-text mr-2">Add reverse</span>
          <input name="reverse" type="checkbox" className="checkbox checkbox-lg" />
        </label>
        <button className="btn btn-primary" type="submit">
          Create card
        </button>
      </div>
    </form>
  );
}
