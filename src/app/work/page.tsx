import { PageHero } from "@/components/page-hero";
import { WorkIndex } from "@/components/work-index";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Studies from Cubical Dot: research, identity, campaigns, and website design for international brands.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        index="02"
        label="Work"
        title="Selected studies."
        lede="Research, identity, campaigns, and the sites. Each study is the work as it shipped."
        form="screens"
      />
      <WorkIndex />
    </>
  );
}
