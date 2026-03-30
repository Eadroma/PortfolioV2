/**
 * Maps a skill display name (case-insensitive) to its devicon CSS class prefix.
 * Usage: `devicon-${deviconMap[key]}-plain colored`
 * Falls back to null when no icon exists.
 */
const RAW_MAP: Record<string, string> = {
  // Web / Frontend
  html: "html5",
  "html5": "html5",
  css: "css3",
  "css3": "css3",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  react: "react",
  "react.js": "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "nuxt.js": "nuxtjs",
  nuxtjs: "nuxtjs",
  angular: "angularjs",
  svelte: "svelte",
  astro: "astro",
  sass: "sass",
  scss: "sass",
  less: "less",
  "tailwind css": "tailwindcss",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  storybook: "storybook",
  vite: "vitejs",
  webpack: "webpack",
  babel: "babel",

  // Backend
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  express: "express",
  "express.js": "express",
  nestjs: "nestjs",
  fastify: "fastify",
  django: "django",
  flask: "flask",
  fastapi: "fastapi",
  spring: "spring",
  rails: "rails",
  ruby: "ruby",
  php: "php",
  laravel: "laravel",
  go: "go",
  golang: "go",
  rust: "rust",
  java: "java",
  kotlin: "kotlin",
  scala: "scala",
  elixir: "elixir",
  python: "python",
  "c#": "csharp",
  csharp: "csharp",
  "c++": "cplusplus",
  "c": "c",
  ".net": "dotnetcore",
  dotnet: "dotnetcore",

  // Database
  postgresql: "postgresql",
  postgres: "postgresql",
  mysql: "mysql",
  mongodb: "mongodb",
  mongo: "mongodb",
  redis: "redis",
  sqlite: "sqlite",
  firebase: "firebase",
  supabase: "supabase",
  prisma: "prisma",
  graphql: "graphql",

  // DevOps / Cloud
  docker: "docker",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbitbucket",
  linux: "linux",
  ubuntu: "ubuntu",
  debian: "debian",
  nginx: "nginx",
  apache: "apache",
  aws: "amazonwebservices",
  "google cloud": "googlecloud",
  gcp: "googlecloud",
  azure: "azure",
  vercel: "vercel",
  netlify: "netlify",
  heroku: "heroku",
  terraform: "terraform",
  ansible: "ansible",
  jenkins: "jenkins",

  // Tools & Misc
  figma: "figma",
  xd: "xd",
  photoshop: "photoshop",
  illustrator: "illustrator",
  jira: "jira",
  confluence: "confluence",
  vscode: "vscode",
  vim: "vim",
  bash: "bash",
  powershell: "powershell",
  npm: "npm",
  yarn: "yarn",
  pnpm: "pnpm",

  // Mobile
  flutter: "flutter",
  dart: "dart",
  "react native": "react",
  ionic: "ionic",
  swift: "swift",
  "objective-c": "objectivec",

  // Testing
  jest: "jest",
  vitest: "vitest",
  cypress: "cypressio",
  playwright: "playwright",
  selenium: "selenium",

  // AI / Data
  pytorch: "pytorch",
  tensorflow: "tensorflow",
  pandas: "pandas",
  numpy: "numpy",
  jupyter: "jupyter",
};

// Build lowercase lookup
const DEVICON_MAP = Object.fromEntries(
  Object.entries(RAW_MAP).map(([k, v]) => [k.toLowerCase(), v])
);

/**
 * Returns the devicon base name for a skill, or null if not found.
 * E.g. "React" → "react"  →  use `devicon-react-original colored`
 */
export function getDeviconName(skill: string): string | null {
  return DEVICON_MAP[skill.toLowerCase()] ?? null;
}
