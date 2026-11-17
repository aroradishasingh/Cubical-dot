import { Stop } from "@/components/story-line";
import { WorkIndex } from "@/components/work-index";

/**
 * Selected works: every study, listed right on the home page (the same index
 * as /work), so there is no extra click to see the full body of work.
 */
export function WorkStack() {
  return (
    <WorkIndex
      dark
      heading={
        <h2 id="work-title" className="mb-12 text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em]">
          Selected <span className="serif-i">works</span>
          <Stop />
        </h2>
      }
    />
  );
}
