interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function Field({ label, value, onChange, placeholder, multiline }: FieldProps) {
  const base =
    "w-full bg-[#1e1f22] border border-[#3f4147] focus:border-[#5865F2] text-[#dbdee1] text-sm rounded-lg px-3 py-2 outline-none transition-colors placeholder:text-[#4f545c]";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#949ba4] text-xs font-semibold uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}
