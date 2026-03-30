"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { RepoSearch } from "./RepoSearch";
import { RepoItem } from "./RepoItem";
import { cardVariants } from "@/lib/animations";
import { getLanguageColor } from "@/lib/languageColors";
import { useUserConfig } from "@/context/UserConfigContext";
import type { Lang, Repo, GitHubRepo } from "@/types/content";

interface RepoCardProps {
  lang: Lang;
}

function normalizeRepo(r: GitHubRepo): Repo {
  return {
    name: r.name,
    description: r.description ?? "",
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language ?? "Unknown",
    languageColor: getLanguageColor(r.language),
    url: r.html_url,
  };
}

export function RepoCard({ lang }: RepoCardProps) {
  const user = useUserConfig();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<string>("All");

  const { labels } = user.i18n[lang];

  const languages = useMemo(() => {
    const unique = Array.from(
      new Set(repos.map((r) => r.language).filter((l) => l !== "Unknown"))
    ).sort();
    return ["All", ...unique];
  }, [repos]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(
      `https://api.github.com/users/${user.githubUsername}/repos?per_page=100&sort=updated`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json() as Promise<GitHubRepo[]>;
      })
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setRepos(sorted.map(normalizeRepo));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [user.githubUsername]);

  const filtered = useMemo(
    () =>
      repos.filter((r) => {
        const matchesLang = langFilter === "All" || r.language === langFilter;
        const matchesQuery =
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()) ||
          r.language.toLowerCase().includes(query.toLowerCase());
        return matchesLang && matchesQuery;
      }),
    [query, langFilter, repos]
  );

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-1 md:col-span-12 lg:col-span-6 bg-[#2b2d31] rounded-2xl p-6 shadow-lg flex flex-col border border-[#3f4147]/50 min-h-[480px]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
        <div className="flex items-center gap-2 text-white font-bold text-lg whitespace-nowrap">
          <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" className="text-[#949ba4]" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
          {labels.topRepos}
        </div>
        <RepoSearch
          value={query}
          placeholder={labels.searchRepos}
          onChange={setQuery}
        />
      </div>

      {languages.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-4 shrink-0">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLangFilter(l)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                langFilter === l
                  ? "bg-[#5865F2] text-white"
                  : "bg-[#1e1f22] text-[#949ba4] hover:text-[#dbdee1] border border-[#3f4147]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto pr-2 pb-2 scrollbar-hide">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-[#949ba4] gap-3">
              <Loader2 size={28} className="animate-spin" />
              <p className="text-sm">{labels.loadingRepos}</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-[#949ba4] gap-3">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-sm">{labels.errorRepos}</p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((repo, idx) => (
                <RepoItem key={`${repo.name}-${idx}`} repo={repo} />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-[#949ba4] space-y-3">
              <Search size={32} className="opacity-50" />
              <p className="text-sm font-medium">
                {labels.noRepos} &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
