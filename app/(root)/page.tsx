import { Hero } from "@/components/hero";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
    </div>
  );
}
