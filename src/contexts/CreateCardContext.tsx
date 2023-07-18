'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  SetStateAction,
  Dispatch,
} from 'react';
import { verify } from '@/utils/verify';
import { Deck } from '@/types/database-types';
import { LanguageResult } from '@google-cloud/translate/build/src/v2';
interface CreateCardContextValue {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  inputLanguage: string | null;
  setInputLanguage: Dispatch<SetStateAction<string | null>>;

  targetText: string;
  setTargetText: Dispatch<SetStateAction<string>>;

  targetLanguage: string | null;
  setTargetLanguage: Dispatch<SetStateAction<string | null>>;
  deck: Deck;
  languages: Array<LanguageResult>;
}

const CreateCardContext = createContext<CreateCardContextValue | null>(null);
interface CreateCardContextProps {
  children: ReactNode;
  deck: Deck;
  languages: Array<LanguageResult>;
}

export function CreateCardContextProvider({ children, deck, languages }: CreateCardContextProps) {
  const [inputText, setInputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState<string | null>(deck.base_language);
  const [targetText, setTargetText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<string | null>(deck.study_language);

  return (
    <CreateCardContext.Provider
      value={{
        inputText,
        setInputText,
        inputLanguage,
        setInputLanguage,
        targetText,
        setTargetText,
        targetLanguage,
        setTargetLanguage,
        deck,
        languages,
      }}
    >
      {children}
    </CreateCardContext.Provider>
  );
}

export function useCreateCardContext() {
  const context = useContext(CreateCardContext);
  verify(context, 'useCreateCardContext must be used inside CreateCardContextProvider');
  return context;
}
