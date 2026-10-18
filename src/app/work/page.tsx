import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Studio studies from Cubical Dot. Representative website design and redesign engagements for premium, international brands.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        index="02"
        label="Work"
        title="Selected studies."
        lede="Six digital flagships. Each one is a studio study — a representative engagement written to the standard we hold a live brief. Names illustrate the work. They are not a client roster."
        variant="cascade"
        tone="dusk"
      />
      <WorkIndex />
    </>
  );
}
