import type {
  UserConfig,
  LangContent,
  UILabels,
  Experience,
  Project,
  SkillCategory,
} from "@/types/content";

// ---------------------------------------------------------------------------
// Low-level assertion helpers
// ---------------------------------------------------------------------------

type Primitive = "string" | "number" | "boolean";

function assertExists(value: unknown, path: string): void {
  if (value === undefined || value === null) {
    throw new Error(`Missing required field: "${path}"`);
  }
}

function assertType(value: unknown, expected: Primitive, path: string): void {
  assertExists(value, path);
  if (typeof value !== expected) {
    throw new Error(
      `Field "${path}" should be ${expected}, got ${typeof value}`
    );
  }
}

function assertArray(value: unknown, path: string): void {
  assertExists(value, path);
  if (!Array.isArray(value)) {
    throw new Error(
      `Field "${path}" should be an array, got ${typeof value}`
    );
  }
}

function assertObject(value: unknown, path: string): Record<string, unknown> {
  assertExists(value, path);
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error(
      `Field "${path}" should be an object, got ${Array.isArray(value) ? "array" : typeof value}`
    );
  }
  return value as Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Domain-level validators
// ---------------------------------------------------------------------------

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

function validateLabels(raw: unknown, path: string): UILabels {
  const obj = assertObject(raw, path);
  for (const key of LABEL_KEYS) {
    assertType(obj[key], "string", `${path}.${key}`);
  }
  return obj as unknown as UILabels;
}

function validateExperience(raw: unknown, path: string): Experience {
  const obj = assertObject(raw, path);
  assertType(obj.role, "string", `${path}.role`);
  assertType(obj.company, "string", `${path}.company`);
  assertType(obj.period, "string", `${path}.period`);
  assertType(obj.description, "string", `${path}.description`);
  if (obj.url !== null && obj.url !== undefined) {
    assertType(obj.url, "string", `${path}.url`);
  } else if (!("url" in obj)) {
    throw new Error(`Missing required field: "${path}.url" (use null if no website)`);
  }
  return obj as unknown as Experience;
}

function validateProject(raw: unknown, path: string): Project {
  const obj = assertObject(raw, path);
  assertType(obj.title, "string", `${path}.title`);
  assertType(obj.type, "string", `${path}.type`);
  assertType(obj.image, "string", `${path}.image`);
  assertType(obj.description, "string", `${path}.description`);
  assertType(obj.tech, "string", `${path}.tech`);
  assertType(obj.url, "string", `${path}.url`);
  return obj as unknown as Project;
}

function validateLangContent(raw: unknown, path: string): LangContent {
  const obj = assertObject(raw, path);

  assertType(obj.role, "string", `${path}.role`);
  assertType(obj.bio, "string", `${path}.bio`);
  assertType(obj.location, "string", `${path}.location`);

  const labels = validateLabels(obj.labels, `${path}.labels`);

  assertArray(obj.experiences, `${path}.experiences`);
  const experiences = (obj.experiences as unknown[]).map((e, i) =>
    validateExperience(e, `${path}.experiences[${i}]`)
  );

  assertArray(obj.projects, `${path}.projects`);
  const projects = (obj.projects as unknown[]).map((p, i) =>
    validateProject(p, `${path}.projects[${i}]`)
  );

  return { role: obj.role as string, bio: obj.bio as string, location: obj.location as string, labels, experiences, projects };
}

// ---------------------------------------------------------------------------
// Root validator — throws a descriptive Error on any issue
// ---------------------------------------------------------------------------

const VALID_STATUSES = ["online", "idle", "dnd", "offline"] as const;

export function validateUserConfig(raw: unknown): UserConfig {
  const c = assertObject(raw, "user.json");

  assertType(c.name, "string", "name");
  assertType(c.tag, "string", "tag");
  assertType(c.avatar, "string", "avatar");
  assertType(c.githubUsername, "string", "githubUsername");
  assertType(c.githubUrl, "string", "githubUrl");
  assertType(c.contactEmail, "string", "contactEmail");
  assertType(c.phone, "string", "phone");
  assertType(c.linkedinUrl, "string", "linkedinUrl");

  assertExists(c.status, "status");
  if (!VALID_STATUSES.includes(c.status as (typeof VALID_STATUSES)[number])) {
    throw new Error(
      `Field "status" should be one of ${VALID_STATUSES.join(" | ")}, got "${c.status}"`
    );
  }

  assertArray(c.skills, "skills");
  const skills = (c.skills as unknown[]).map((cat, i) => {
    const obj = assertObject(cat, `skills[${i}]`);
    assertType(obj.category, "string", `skills[${i}].category`);
    assertArray(obj.items, `skills[${i}].items`);
    (obj.items as unknown[]).forEach((s, j) =>
      assertType(s, "string", `skills[${i}].items[${j}]`)
    );
    return obj as unknown as SkillCategory;
  });

  const i18n = assertObject(c.i18n, "i18n");
  const en = validateLangContent(i18n.en, "i18n.en");
  const fr = validateLangContent(i18n.fr, "i18n.fr");

  return {
    name: c.name as string,
    tag: c.tag as string,
    avatar: c.avatar as string,
    status: c.status as UserConfig["status"],
    githubUsername: c.githubUsername as string,
    githubUrl: c.githubUrl as string,
    contactEmail: c.contactEmail as string,
    phone: c.phone as string,
    linkedinUrl: c.linkedinUrl as string,
    skills,
    i18n: { en, fr },
  };
}
