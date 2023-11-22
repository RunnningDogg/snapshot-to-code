import FrontSelector from "@/components/ui-tony/FrontSelector";
import ImageUploader from "@/components/ui-tony/ImageUploader";
import RenderHTML from "@/components/ui-tony/RenderHTML";
import RenderPart from "@/components/ui-tony/RenderPart";
export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-3 min-h-screen p-10">
      <div className="w-1/2 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-8">Hi</h1>
        <ImageUploader />
        <FrontSelector />
      </div>

      <RenderHTML />
    </main>
  );
}
