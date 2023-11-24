import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {}

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });
  // console.log("上传数据123:" + request);
  // const data = await request.formData();
  // console.log("上传数据:" + data);
  // const image_file = data.get("file") as File;
  // const message = data.get("message") as string;
  // console.log("上传数据 base64:");
  // console.log(image_file);

  const data = await request.json();
  const message = data["message"] as string;
  const base64_image = data["file"] as string;
  console.log(base64_image);
  if (!base64_image) {
    console.log("图片异常");
    return new Response("base64_image is empty", { status: 400 });
  }
  let promptMessage =
    "You are a frontend expert, please give the HTML code for the following image and do not give <img> tag";

  if (message) {
    promptMessage += message;
  }

  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: promptMessage,
        },
        {
          type: "image_url",
          image_url: {
            url: `${base64_image}`,
          },
        },
      ],
    },
  ];
  // const body = await req.json();
  // console.log(body);
  // const stream = openai.beta.chat.completions.stream({
  //   model: "gpt-3.5-turbo",
  //   stream: true,
  //   // @ts-ignore
  //   messages: [{ role: "user", content: body["message"] }],
  // });
  const stream = openai.beta.chat.completions.stream({
    model: "gpt-4-vision-preview",
    stream: true,
    // @ts-ignore
    messages: messages,
  });

  return new Response(stream.toReadableStream());
}
