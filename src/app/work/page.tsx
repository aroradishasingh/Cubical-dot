import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Studies from Cubical Dot: research, identity, campaigns, and website design for international brands.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        index="02"
        label="Work"
        title="Selected studies."
        lede="Research, identity, campaigns, and the sites. The client studies are the work as it shipped. The named flagships are representative engagements, written to the same standard."
        variant="cascade"
        tone="dusk"
      />
      <WorkIndex />
    </>
  );
}
