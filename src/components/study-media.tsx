import Image from "next/image";
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
    const deck = study.gallery?.some((piece) => piece.deck) && study.galleryWidth !== "page";
    if (deck) {
      return (
        <img
          src={study.cover}
          alt=""
          className="absolute inset-x-0 top-0 mx-auto h-[72%] w-auto max-w-full object-contain"
        />
      );
    }
    return <Image src={study.cover} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />;
  }

  return <FieldArt variant={study.composition} tone={study.tone} motion={motion} />;
}
