import LanguageSelect from '@/components/LanguageSelect';
import { LanguageResult } from '@google-cloud/translate/build/src/v2';
import { useMemo } from 'react';
import { useCreateCardContext } from '@/contexts/CreateCardContext';

interface Props {
  label: string;
  name: string;
  code: string | null;
  onLanguageChange: (code: string | null) => void;
}

export default function LanguageSelectLabel({ label, name, code, onLanguageChange }: Props) {
  const { languages } = useCreateCardContext();

  const language = useMemo(() => languages.find((l) => l.code === code), [languages, code]);

  return (
    <label className="label">
      <span>{label}</span>
      <LanguageSelect
        languages={languages}
        name={name}
        defaultValue={language}
        onChange={onLanguageChange}
      />
    </label>
  );
}
