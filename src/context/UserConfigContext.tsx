"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle, FileJson } from "lucide-react";
import { validateUserConfig } from "@/lib/validateUserConfig";
import type { UserConfig } from "@/types/content";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const UserConfigContext = createContext<UserConfig | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface UserConfigProviderProps {
  config: unknown;
  children: ReactNode;
}

type ValidationResult =
  | { ok: true; config: UserConfig }
  | { ok: false; error: string };

export function UserConfigProvider({
  config,
  children,
}: UserConfigProviderProps) {
  const [result] = useState<ValidationResult>(() => {
    try {
      return { ok: true, config: validateUserConfig(config) };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Unknown validation error",
      };
    }
  });

  if (!result.ok) {
    return <ConfigErrorScreen message={result.error} />;
  }

  return (
    <UserConfigContext.Provider value={result.config}>
      {children}
    </UserConfigContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useUserConfig(): UserConfig {
  const ctx = useContext(UserConfigContext);
  if (!ctx) {
    throw new Error("useUserConfig must be used inside <UserConfigProvider>");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Error screen
// ---------------------------------------------------------------------------

function ConfigErrorScreen({ message }: { message: string }) {
  // Split "Missing required field: "i18n.en.labels.contact"" into
  // a prefix and a highlighted path for better readability.
  const match = message.match(/^(.*?:)\s*"?([^"]+)"?\s*(.*)$/);
  const prefix = match?.[1] ?? "";
  const highlight = match?.[2] ?? message;
  const suffix = match?.[3] ?? "";

  return (
    <div className="min-h-screen bg-[#1e1f22] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-[#2b2d31] border border-red-500/40 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              Configuration Error
            </h1>
            <p className="text-[#949ba4] text-sm">
              Fix <code className="text-[#5865F2]">src/config/user.json</code> to continue
            </p>
          </div>
        </div>

        {/* Error message */}
        <div className="bg-[#1e1f22] rounded-xl p-4 border border-[#3f4147] font-mono text-sm leading-relaxed">
          {match ? (
            <p>
              <span className="text-[#949ba4]">{prefix} </span>
              <span className="text-red-400 font-semibold">&quot;{highlight}&quot;</span>
              {suffix && <span className="text-[#949ba4]"> {suffix}</span>}
            </p>
          ) : (
            <p className="text-red-400">{message}</p>
          )}
        </div>

        {/* Hint */}
        <div className="mt-5 flex items-start gap-3 text-[#949ba4] text-sm">
          <FileJson size={16} className="shrink-0 mt-0.5 text-[#5865F2]" />
          <p>
            Open <code className="text-[#dbdee1]">src/config/user.json</code>,
            locate the field shown above, and make sure it exists with the
            correct type.
          </p>
        </div>
      </div>
    </div>
  );
}
