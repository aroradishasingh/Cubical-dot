import { DesignedFor } from "@/components/designed-for";
import { Close } from "@/components/home/close";
import { Hero } from "@/components/home/hero";
import { JournalTease } from "@/components/home/journal-tease";
import { Manifesto } from "@/components/home/manifesto";
import { MarkStory } from "@/components/home/mark-story";
import { Marquee } from "@/components/home/marquee";
import { Method } from "@/components/home/method";
import { Practice } from "@/components/home/practice";
import { WorkReel } from "@/components/home/work-reel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <DesignedFor />
      <Manifesto />
      <WorkReel />
      <Practice />
      <Method />
      <MarkStory />
      <JournalTease />
      <Close />
    </>
  );
}
