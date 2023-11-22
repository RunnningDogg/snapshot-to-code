"use client";
import React, { useEffect, useState } from "react";

type Props = {};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prism from "prismjs";
import "prismjs/components/prism-cshtml";
import "prismjs/themes/prism-tomorrow.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
// import "../../app/prism.css";

export default function RenderPart({}: Props) {
  const [tab, setTab] = useState("code");
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
      await Prism.highlightAll();
    };
    highlight();
  }, [html, tab]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-3">
        <Button>HTML</Button>
        <Button>CODE</Button>
      </div>
    </div>
    // <Tabs defaultValue="code" value={tab} className="w-full h-1/2">
    //   <TabsList className="grid w-full grid-cols-2">
    //     <TabsTrigger value="html" onClick={() => setTab("html")}>
    //       HTML
    //     </TabsTrigger>
    //     <TabsTrigger value="code" onClick={() => setTab("code")}>
    //       Code
    //     </TabsTrigger>
    //   </TabsList>

    //   <TabsContent value="html">
    //     <iframe
    //       className="w-full h-full "
    //       srcDoc={html}
    //       sandbox="allow-scripts"
    //     ></iframe>
    //   </TabsContent>
    //   <TabsContent value="code"></TabsContent>

    //   {tab === "code" && (
    //     <pre>
    //       <code className="language-markup">{html}</code>
    //     </pre>
    //   )}

    //   <Textarea
    //     placeholder="We're writing to [inset]. Congrats from OpenAI!"
    //     className="mt-10 min-h-[300px] mb-10"
    //     value={html}
    //     onChange={(e) => setHtml(e.target.value)}
    //   />
    // </Tabs>
  );
}
