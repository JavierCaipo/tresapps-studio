// Server Component — no "use client" directive.
// Data is fetched at build time and revalidated hourly via ISR.

import { FolderGit2, Star, GitFork, ExternalLink, AlertTriangle } from "lucide-react";
import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
}

// ─── Data Fetching (ISR — revalidates every hour) ─────────────────────────────

async function fetchRepos(): Promise<GitHubRepo[]> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "TresApps";

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=20`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        // ISR: cache server-side for 1 hour. Never runs in the browser.
        next: { revalidate: 3600, tags: ["github-repos"] },
      }
    );

    if (!res.ok) {
      console.warn(
        `[LabRepos] GitHub API responded with ${res.status}. Serving static fallback.`
      );
      return [];
    }

    const all: GitHubRepo[] = await res.json();

    return all
      .filter((r) => !r.fork && r.description && r.description.trim() !== "")
      .slice(0, 4);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[LabRepos] fetch failed: ${msg}`);
    return [];
  }
}

// ─── Language Color Map ───────────────────────────────────────────────────────

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3B82F6",
  JavaScript: "#EAB308",
  Rust: "#F97316",
  Python: "#A78BFA",
  Go: "#06B6D4",
  Swift: "#F43F5E",
  "C++": "#EC4899",
  Kotlin: "#8B5CF6",
  Ruby: "#EF4444",
  Dart: "#06B6D4",
};

function LangDot({ language }: { language: string | null }) {
  if (!language) return null;
  const color = LANG_COLOR[language] ?? "#6B7280";
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

// ─── Skeleton / Fallback ──────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-36 rounded-2xl bg-[#131314]/60 border border-white/5 animate-pulse"
        />
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span>Could not reach GitHub API. Retrying next build.</span>
    </div>
  );
}

// ─── Repo Card ────────────────────────────────────────────────────────────────

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const updatedAt = new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.round(
      (new Date(repo.updated_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    ),
    "day"
  );

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${repo.name} on GitHub`}
      className="group flex flex-col gap-3 p-5 rounded-2xl
        bg-[#131314]/60 backdrop-blur-2xl border border-white/10
        hover:scale-[1.02] hover:border-[#8B5CF6]/50
        hover:shadow-[inset_0_0_30px_rgba(139,92,246,0.15)]
        transition-all duration-300 cursor-pointer"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FolderGit2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
          <span className="font-mono text-white text-sm truncate group-hover:text-[#06B6D4] transition-colors duration-200">
            {repo.name}
          </span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#06B6D4] flex-shrink-0 transition-colors duration-200" />
      </div>

      {/* Description */}
      <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2 flex-grow">
        {repo.description}
      </p>

      {/* Footer: language + stats + updated */}
      <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
        {repo.language && (
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-black/50 border border-white/10 rounded uppercase tracking-widest text-[9px]">
            <LangDot language={repo.language} />
            {repo.language}
          </span>
        )}

        <span className="flex items-center gap-1 ml-auto">
          <Star className="w-3 h-3" />
          {repo.stargazers_count.toLocaleString()}
        </span>

        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks_count.toLocaleString()}
        </span>

        <span className="hidden sm:inline text-white/20">{updatedAt}</span>
      </div>
    </a>
  );
}

// ─── Default Export (Server Component) ───────────────────────────────────────

export default async function LabRepos() {
  const repos = await fetchRepos();

  if (repos.length === 0) {
    // Distinguish network error from empty account
    return <ErrorState />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

// Named export for use with React Suspense boundaries
export { EmptyState as LabReposSkeleton };
