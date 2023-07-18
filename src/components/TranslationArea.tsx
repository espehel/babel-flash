interface Props {
  value: string;
  onChange: (value: string) => void;
  name: string;
}
export default function TranslationArea({ value, onChange, name }: Props) {
  return (
    <div>
      <textarea
        name={name}
        className="textarea textarea-bordered textarea-lg"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}
