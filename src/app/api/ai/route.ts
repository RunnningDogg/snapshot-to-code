import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {}

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });
  const body = await req.json();

  const stream = openai.beta.chat.completions.stream({
    model: "gpt-3.5-turbo",
    stream: true,
    // @ts-ignore
    messages: [{ role: "user", content: body.message }],
  });

  return new Response(stream.toReadableStream());
}
