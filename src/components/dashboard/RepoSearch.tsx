import { Search } from "lucide-react";

interface RepoSearchProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function RepoSearch({ value, placeholder, onChange }: RepoSearchProps) {
  return (
    <div className="relative w-full sm:w-64 group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search
          size={16}
          className="text-[#949ba4] group-focus-within:text-[#5865F2] transition-colors"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1e1f22] border border-[#3f4147] text-[#dbdee1] text-sm rounded-lg focus:ring-[#5865F2] focus:border-[#5865F2] block pl-9 p-2.5 transition-all outline-none shadow-inner"
      />
    </div>
  );
}
