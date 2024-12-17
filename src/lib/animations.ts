import gsap from "gsap/dist/gsap";

export function getHeroTimeline(
  chars1: Array<HTMLElement>,
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(
    chars1,
    {
      "--text-weight": 500,
    },
    {
      "--text-weight": 700,
      yoyo: true,
      repeat: -1,
      duration: 2,
      stagger: 0.1,
    },
  );

  return tl;
}
