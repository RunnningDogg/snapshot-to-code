"use client";
import React, { useEffect, useState } from "react";

type Props = {};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prism from "prismjs";
import "prismjs/components/prism-cshtml";
import "prismjs/themes/prism-tomorrow.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
// import "../../app/prism.css";

export default function RenderHTML({}: Props) {
  const [active, setActive] = useState("html");
  const [edit, setEdit] = useState(false);
  const [html, setHtml] = useState(`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple HTML Example</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML example.</p>
    <p>This is a simple HTML example2.</p>
  </body>
  </html>`);

  useEffect(() => {
    const highlight = async () => {
      // console.log("highlight");

      await Prism.highlightAll();
    };
    highlight();
  }, [html, active]);

  return (
    <div className="flex flex-col  ">
      <div className="grid grid-cols-2 gap-3 bg-slate-100   rounded">
        <button
          className={cn(" text-black rounded px-3 py-2 ", {
            "bg-violet-400 text-white": active === "html",
          })}
          onClick={() => setActive("html")}
        >
          HTML
        </button>

        <button
          className={cn(" text-black rounded px-3 py-2 ", {
            "bg-violet-400 text-white": active === "code",
          })}
          onClick={() => setActive("code")}
        >
          CODE
        </button>
      </div>

      {active === "html" ? (
        <iframe
          className="w-full h-full "
          srcDoc={html}
          sandbox="allow-scripts"
        ></iframe>
      ) : (
        <div className="">
          <pre>
            <code className="language-markup">{html}</code>
          </pre>

          <Button onClick={() => setEdit(true)}>Edit</Button>
        </div>
      )}

      {edit && (
        <div>
          <Textarea
            placeholder="We're writing to [inset]. Congrats from OpenAI!"
            className="mt-10 min-h-[300px] mb-3"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
          <Button onClick={() => setEdit(false)}>Done</Button>
        </div>
      )}
    </div>
  );
}
