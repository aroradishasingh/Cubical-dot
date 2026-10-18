import Link from "next/link";
import { Chapter } from "@/components/chapter";
import { FieldArt } from "@/components/field-art";

export function MarkStory() {
  return (
    <section className="grid bg-ivory lg:grid-cols-2">
      <div className="relative min-h-[420px] lg:min-h-[720px]">
        <FieldArt variant="split" tone="ink" />
      </div>
      <div className="flex flex-col justify-center px-[var(--page-margin)] py-16 lg:py-24 lg:pr-[var(--page-margin)] lg:pl-[var(--grid-gutter)]">
        <Chapter index="06" label="The mark" />
        <h2 className="display mt-6 text-[clamp(2.5rem,4.5vw,4.4rem)]">
          Simple forms.
          <br />
          Bigger ideas.
        </h2>
        <div className="mt-6 max-w-md space-y-4 text-base leading-relaxed text-charcoal">
          <p>
            A cube is structure. A dot is the idea in motion. Together they are the smallest complete mark we know, and the way the studio works.
          </p>
          <p>
            Reduce the form. Raise the idea. The websites we design for clients follow the same rule, whether the brand is a house, a firm, or a practice entering its next market.
          </p>
        </div>
        <Link href="/about" className="mt-8 inline-flex text-sm font-medium underline decoration-lime decoration-2 underline-offset-4">
          Read the studio
        </Link>
      </div>
    </section>
  );
}
