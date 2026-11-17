import { DesignedFor } from "@/components/designed-for";
import { Founders } from "@/components/founders";
import { Close } from "@/components/home/close";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { JournalTease } from "@/components/home/journal-tease";
import { Principles } from "@/components/home/principles";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";
import { WorkStack } from "@/components/home/work-stack";
import { StoryLine } from "@/components/story-line";

// One story, nine chapters. The lime dot draws a line through every chapter's stop.
export default function HomePage() {
  return (
    <StoryLine>
      <Hero />
      <Intro />
      <DesignedFor />
      <WorkStack />
      <Founders eyebrow="04 — Who you work with" />
      <Services />
      <Process />
      <Principles />
      <JournalTease />
      <Close />
    </StoryLine>
  );
}
