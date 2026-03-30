import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "src/config/user.json");

function devOnly() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function GET() {
  const guard = devOnly();
  if (guard) return guard;

  const raw = await readFile(CONFIG_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  const guard = devOnly();
  if (guard) return guard;

  const body = await request.json();
  await writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
