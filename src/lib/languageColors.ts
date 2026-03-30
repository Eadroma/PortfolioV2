const colors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Python: "#3572A5",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#E34C26",
  CSS: "#563D7C",
  SCSS: "#C6538C",
  Shell: "#89E051",
  Vue: "#41B883",
  Svelte: "#FF3E00",
  Elixir: "#6E4A7E",
  Haskell: "#5E5086",
  Lua: "#000080",
  R: "#198CE7",
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "#8b949e";
  return colors[language] ?? "#8b949e";
}
