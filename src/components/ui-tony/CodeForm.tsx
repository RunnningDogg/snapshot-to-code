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
// define form schema
const FormSchema = z.object({
  image_type: z.string({
    required_error: "Please select an image type",
  }),
  code_type: z.string({
    description: "The code type",
    required_error: "Please select a code type",
  }),
});

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setImageType: React.Dispatch<React.SetStateAction<"low" | "high">>;
};

export default function CodeForm({ loading, setLoading, setImageType }: Props) {
  // form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setTimeout(() => {
      toast.success("File uploaded");
      setLoading(false);
    }, 2000);
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
                <Link href="https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding">
                  OPENAI
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
