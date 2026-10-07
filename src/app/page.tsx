import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { HowIThink } from "@/components/sections/HowIThink";
import { DesignProcess } from "@/components/sections/DesignProcess";
import { DesignSystem } from "@/components/sections/DesignSystem";
import { About } from "@/components/sections/About";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <HowIThink />
      <DesignProcess />
      <DesignSystem />
      <About />
      <GitHubSection />
      <Contact />
    </>
  );
}
