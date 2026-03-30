import type { UserConfig, Lang, UILabels } from "@/types/content";
import { SectionCard } from "../components/SectionCard";
import { Field } from "../components/Field";

interface Props {
  config: UserConfig;
  lang: Lang;
  onChange: (c: UserConfig) => void;
}

const LABEL_KEYS: (keyof UILabels)[] = [
  "contact",
  "experience",
  "skillsTitle",
  "topRepos",
  "searchRepos",
  "featured",
  "availability",
  "availableBtn",
  "langToggle",
  "openToWork",
  "noRepos",
  "loadingRepos",
  "errorRepos",
];

export function LabelsSection({ config, lang, onChange }: Props) {
  function set(key: keyof UILabels, value: string) {
    onChange({
      ...config,
      i18n: {
        ...config.i18n,
        [lang]: {
          ...config.i18n[lang],
          labels: { ...config.i18n[lang].labels, [key]: value },
        },
      },
    });
  }

  const { labels } = config.i18n[lang];

  return (
    <SectionCard title="UI Labels" description="All button and section texts for this language">
      <div className="grid grid-cols-2 gap-4">
        {LABEL_KEYS.map((key) => (
          <Field
            key={key}
            label={key}
            value={labels[key]}
            onChange={(v) => set(key, v)}
          />
        ))}
      </div>
    </SectionCard>
  );
}
