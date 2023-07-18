'use client';
import { useMemo } from 'react';
import Select from 'react-select';
import { LanguageResult } from '@google-cloud/translate/build/src/v2';

type Props = {
  languages: LanguageResult[];
  name: string;
  defaultValue?: LanguageResult;
  onChange?: (value: string | null) => void;
};

interface Option {
  value: string;
  label: string;
}

export default function LanguageSelect({ languages, name, defaultValue, onChange }: Props) {
  const defaultOption = defaultValue && { label: defaultValue.name, value: defaultValue.name };

  const options = useMemo(
    () => languages.map(({ code, name }) => ({ value: code, label: name })),
    [languages]
  );

  const handleOnChange = (option: Option | null) => {
    if (onChange) {
      onChange(option && option.value);
    }
  };

  return (
    <div>
      <Select
        defaultValue={defaultOption}
        onChange={handleOnChange}
        options={options}
        name={name}
      />
    </div>
  );
}
