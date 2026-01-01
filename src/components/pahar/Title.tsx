// Title.tsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type Props = {
  title: string | undefined;
  isLeaving?: boolean; // Add this prop to trigger exit animation
};

const Title = ({ title, isLeaving = false }: Props) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    if (tlRef.current) tlRef.current.kill();
    if (splitRef.current) splitRef.current.revert();

    const split = new SplitText(el, { type: "chars" });
    splitRef.current = split;

    // Create timeline for entrance animation
    const tl = gsap.timeline();

    if (!isLeaving) {
      // Entrance animation
      tl.fromTo(
        split.chars,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "power4.out",
          duration: 0.8,
        }
      );
    } else {
      // Exit animation - reverse of entrance
      tl.to(split.chars, {
        y: 200,
        opacity: 0,
        stagger: 0.04,
        ease: "power4.in",
        duration: 1.3,
      });
    }

    tlRef.current = tl;

    return () => {
      tl.kill();
      split.revert();
    };
  }, [title, isLeaving]); // Add isLeaving to dependencies

  return (
    <h1
      ref={titleRef}
      className="absolute w-full text-center left-1/2 bottom-10 -translate-x-1/2 text-[96px] font-bold text-white hollow-text uppercase tracking-widest pointer-events-none"
      aria-hidden
    >
      {title}
    </h1>
  );
};

export default Title;
