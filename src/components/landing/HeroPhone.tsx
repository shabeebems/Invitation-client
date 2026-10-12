import { LANDING_HERO_VIDEO } from "@/lib/site-assets";

export default function HeroPhone() {
  return (
    <div className="relative mx-auto w-[min(100%,300px)]">
      <span className="absolute top-24 -left-[2px] h-8 w-[3px] rounded-l bg-zinc-700" />
      <span className="absolute top-36 -left-[2px] h-12 w-[3px] rounded-l bg-zinc-700" />
      <span className="absolute top-32 -right-[2px] h-16 w-[3px] rounded-r bg-zinc-700" />
      <div className="relative rounded-[2.75rem] border-[11px] border-[#111] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute top-2.5 left-1/2 z-10 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#111]" />
        <div className="overflow-hidden rounded-[2.15rem] bg-black">
          {LANDING_HERO_VIDEO ? (
            <video
              className="aspect-[9/19.2] w-full object-cover"
              src={LANDING_HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div className="aspect-[9/19.2] w-full bg-zinc-900" />
          )}
        </div>
      </div>
    </div>
  );
}
