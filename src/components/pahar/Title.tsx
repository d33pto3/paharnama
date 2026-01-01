// Title.tsx
import { useRef, useEffect } from "react";
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
    if (!el || !title) return;

    let split: SplitText | null = null;
    let tl: gsap.core.Timeline | null = null;

    const init = async () => {
      // Wait for fonts to be ready to avoid 'SplitText called before fonts loaded'
      await document.fonts.ready;
      
      if (!titleRef.current) return;

      if (tlRef.current) tlRef.current.kill();
      if (splitRef.current) splitRef.current.revert();

      split = new SplitText(el, { type: "chars" });
      splitRef.current = split;

      if (!split.chars || split.chars.length === 0) return;

      // Create timeline for entrance animation
      tl = gsap.timeline();

      if (!isLeaving) {
        // Entrance animation - more snappy and powerful
        tl.fromTo(
          split.chars,
          { 
            y: 60, 
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: {
              each: 0.02,
              from: "center"
            },
            ease: "power4.out",
            duration: 0.8,
          }
        );
      } else {
        // Exit animation - clean and fast
        tl.to(split.chars, {
          y: -40,
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)",
          stagger: {
            each: 0.015,
            from: "edges"
          },
          ease: "power2.inOut",
          duration: 0.6,
        });
      }

      tlRef.current = tl;
    };

    init();

    return () => {
      if (tl) tl.kill();
      if (split) split.revert();
    };
  }, [title, isLeaving]);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!splitRef.current || isLeaving) return;
    
    const chars = splitRef.current.chars;
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const rect = titleElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    chars.forEach((char: Element) => {
      const charRect = (char as HTMLElement).getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2 - rect.left;
      const charCenterY = charRect.top + charRect.height / 2 - rect.top;

      // Calculate distance from mouse to character center
      const dx = mouseX - charCenterX;
      const dy = mouseY - charCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Multi-layered influence zones for hazy effect
      const maxDistance = 200;
      const strength = Math.max(0, 1 - distance / maxDistance);
      const intensity = Math.pow(strength, 1.5);

      // Only hazy (blur) effect
      const blur = intensity * 12;

      gsap.to(char, {
        filter: `blur(${blur}px)`,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  const handleMouseLeave = () => {
    if (!splitRef.current || isLeaving) return;
    
    // Smooth return to clear state
    gsap.to(splitRef.current.chars, {
      filter: "blur(0px)",
      stagger: {
        each: 0.01,
        from: "center",
      },
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <h1
      ref={titleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute w-full text-center left-1/2 bottom-10 -translate-x-1/2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold text-white uppercase tracking-widest pointer-events-auto font-['Vollkorn'] cursor-default"
      aria-hidden
    >
      {title}
    </h1>
  );
};

export default Title;
