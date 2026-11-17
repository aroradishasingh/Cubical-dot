import { DesignedFor } from "@/components/designed-for";
import { Founders } from "@/components/founders";
import { Close } from "@/components/home/close";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Principles } from "@/components/home/principles";
import { Services } from "@/components/home/services";
import { WorkStack } from "@/components/home/work-stack";
import { StoryLine } from "@/components/story-line";

// One story; the lime dot draws a line through every section's stop.
// `Process` (the method) and `JournalTease` (notes) are kept in
// components/home but no longer shown here: the method is on /services and
// the notes are on /blog, both visible and indexed there.
export default function HomePage() {
  return (
    <StoryLine>
      <Hero />
      <Intro />
      <DesignedFor />
      <WorkStack />
      <Founders />
      <Services />
      <Principles />
      <Close />
    </StoryLine>
  );
}
