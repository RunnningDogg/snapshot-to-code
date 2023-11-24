import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream.mjs";
import { useImageStore } from "@/store/image";
import { convertFileToBase64 } from "@/lib/utils";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setImageType: React.Dispatch<React.SetStateAction<"low" | "high">>;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
};

// define form schema
const FormSchema = z.object({
  image_type: z.string({
    required_error: "Please select an image type",
  }),
  code_type: z.string({
    description: "The code type",
    required_error: "Please select a code type",
  }),
  message: z.string().optional(),
});

export default function CodeForm({
  loading,
  setLoading,
  setImageType,
  setHtml,
}: Props) {
  // form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // zustand
  const { imageFile } = useImageStore();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }
    setLoading(true);
    try {
      // 新增表单数据
      // const formData = new FormData();

      // formData.append("file", imageFile);
      // console.log(base64_file);
      // if (data?.message) {
      //   // message 是可选项
      //   formData.append("message", data.message);
      // }
      const base64_file = await convertFileToBase64(imageFile);
      console.log(base64_file);

      const body = {
        file: base64_file,
        message: data.message,
      };

      fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(async (res) => {
          // @ts-ignore ReadableStream on different environments can be strange
          const runner = ChatCompletionStream.fromReadableStream(res.body);
          runner.on("content", (delta, snapshot) => {
            console.log(delta);
            setHtml((prev) => prev + delta);
          });
          console.log(await runner.finalChatCompletion(), { depth: null });

          toast.success("File uploaded");
        })
        .catch((err) => {
          toast.error("Error uploading file");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error uploading file");
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-col space-y-6 flex gap-3"
      >
        <FormField
          control={form.control}
          name="image_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Type</FormLabel>
              <Select
                onValueChange={(event) => {
                  field.onChange(event);
                  setImageType(event as "low" | "high");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select image type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Detail</SelectLabel>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                Low to disable high res model; high to enable high res model
                Know More on Low/High setting on{" "}
                <Link
                  target="_blank"
                  className="font-semibold text-violet-500  hover:text-violet-700 transition duration-200"
                  href="https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding"
                >
                  OPENAI Detailed page
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select image type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Code</SelectLabel>
                    <SelectItem value="html">Html</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the code type you want to generate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <Textarea onChange={field.onChange} />
              <FormDescription>
                Provide Optional information to the model
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex items-center gap-1.5"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin w-4 h-4 " /> : ""}
          Upload
        </Button>{" "}
      </form>
    </Form>
  );
}
