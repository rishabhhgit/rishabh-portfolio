import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Spotlight } from "@/components/sections/Spotlight";
import { Approach } from "@/components/sections/Approach";
import { DesignSystem } from "@/components/sections/DesignSystem";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee
        tone="ink"
        items={[
          "UI/UX Design",
          "Product Design",
          "Design Systems",
          "Backend & APIs",
          "AI / LLM Integration",
          "Creative Development",
        ]}
      />

      <SelectedWork />

      <Spotlight />

      <Marquee
        tone="surface"
        reverse
        items={[
          "Developer Tools",
          "Real-Time Systems",
          "Data Platforms",
          "Backend Architecture",
          "AI Interfaces",
          "LLM Workflows",
        ]}
      />

      <Approach />
      <DesignSystem />
      <About />

      <Marquee
        tone="gold"
        reverse
        speed={38}
        items={[
          "Open to UI/UX & full-stack roles",
          "Interface first, backend when it counts",
          "AI / LLM in production",
          "Say hello before overthinking it",
        ]}
      />

      <Contact />
    </>
  );
}
