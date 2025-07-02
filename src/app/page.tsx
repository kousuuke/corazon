import Hero from "@/components/hero";
import UrlForm from "@/components/form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-[16px]">
      <Hero />
      <UrlForm />
    </div>
  );
}
