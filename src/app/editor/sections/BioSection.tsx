import type { UserConfig, Lang } from "@/types/content";
import { SectionCard } from "../components/SectionCard";
import { Field } from "../components/Field";

interface Props {
  config: UserConfig;
  lang: Lang;
  onChange: (c: UserConfig) => void;
}

export function BioSection({ config, lang, onChange }: Props) {
  function set(key: "role" | "bio" | "location", value: string) {
    onChange({
      ...config,
      i18n: {
        ...config.i18n,
        [lang]: { ...config.i18n[lang], [key]: value },
      },
    });
  }

  const { role, bio, location } = config.i18n[lang];

  return (
    <SectionCard title="Bio" description="Your title, bio and location for this language">
      <Field label="Role / Title" value={role} onChange={(v) => set("role", v)} />
      <Field label="Bio" value={bio} onChange={(v) => set("bio", v)} multiline />
      <Field label="Location" value={location} onChange={(v) => set("location", v)} />
    </SectionCard>
  );
}
