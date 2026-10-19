import { FieldArt } from "@/components/field-art";
import type { Study } from "@/lib/content";

export function StudyMedia({
  study,
  motion = "idle",
}: {
  study: Study;
  motion?: "hero" | "idle" | "none";
}) {
  if (study.cover) {
    return (
      <img
        src={study.cover}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

  return <FieldArt variant={study.composition} tone={study.tone} motion={motion} />;
}
