export type Lang = "en" | "fr";

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  type: string;
  image: string;
  description: string;
  tech: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  url: string | null;
}

export interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
}

export interface NavLabels {
  home: string;
  projects: string;
  skills: string;
  contact: string;
}

export interface UILabels {
  contact: string;
  experience: string;
  skillsTitle: string;
  topRepos: string;
  searchRepos: string;
  featured: string;
  availability: string;
  availableBtn: string;
  langToggle: string;
  openToWork: string;
  noRepos: string;
  loadingRepos: string;
  errorRepos: string;
}

export interface LangContent {
  role: string;
  bio: string;
  location: string;
  labels: UILabels;
  experiences: Experience[];
  projects: Project[];
}

export interface UserConfig {
  name: string;
  tag: string;
  avatar: string;
  status: "online" | "idle" | "dnd" | "offline";
  githubUsername: string;
  githubUrl: string;
  contactEmail: string;
  phone: string;
  linkedinUrl: string;
  skills: SkillCategory[];
  i18n: {
    en: LangContent;
    fr: LangContent;
  };
}

/** Raw shape returned by the GitHub REST API for a single repo */
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}
