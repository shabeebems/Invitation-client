import { LANDING_HERO_VIDEO } from "@/lib/site-assets";

export default function HeroPhone() {
  return (
    <div className="relative mx-auto flex w-full max-w-[560px] items-end justify-center pt-4 pb-2 lg:max-w-none">
      {/* Decorative Sage Arch Backdrop */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[380px] lg:w-[430px] h-[460px] sm:h-[530px] lg:h-[590px] rounded-t-[190px] sm:rounded-t-[220px] lg:rounded-t-[240px] bg-[#A4B59C] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.03)]"
        aria-hidden="true"
      />

      {/* Left Botanical Sprig with White Blossoms */}
      <svg
        className="pointer-events-none absolute bottom-0 -left-6 sm:-left-2 lg:-left-6 z-10 w-44 sm:w-56 lg:w-64 h-auto select-none drop-shadow-[0_12px_18px_rgba(24,60,44,0.18)]"
        viewBox="0 0 260 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A6A50" />
            <stop offset="100%" stopColor="#25432D" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#678A6E" />
            <stop offset="100%" stopColor="#2D4D36" />
          </linearGradient>
          <linearGradient id="leafGrad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#55775C" />
            <stop offset="100%" stopColor="#1C3823" />
          </linearGradient>
          <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1EFE8" />
          </linearGradient>
        </defs>

        {/* Main stem */}
        <path
          d="M230 260 C 190 250, 130 240, 80 200 C 50 170, 40 120, 48 70"
          stroke="#38543E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Secondary branches */}
        <path
          d="M120 225 C 100 190, 85 170, 60 160"
          stroke="#38543E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M165 240 C 175 210, 190 195, 215 185"
          stroke="#38543E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M70 185 C 50 170, 25 160, 10 145"
          stroke="#38543E"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Leaves */}
        {/* Leaf 1 - top */}
        <path
          d="M48 70 C 45 40, 62 25, 70 20 C 72 38, 62 60, 48 70 Z"
          fill="url(#leafGrad2)"
        />
        {/* Leaf 2 */}
        <path
          d="M48 70 C 30 55, 18 60, 10 72 C 22 82, 38 80, 48 70 Z"
          fill="url(#leafGrad1)"
        />
        {/* Leaf 3 */}
        <path
          d="M58 115 C 35 105, 20 115, 12 130 C 28 138, 48 130, 58 115 Z"
          fill="url(#leafGrad3)"
        />
        {/* Leaf 4 */}
        <path
          d="M62 130 C 80 115, 100 120, 112 132 C 100 148, 80 145, 62 130 Z"
          fill="url(#leafGrad2)"
        />
        {/* Leaf 5 */}
        <path
          d="M60 160 C 40 150, 22 155, 10 168 C 26 178, 48 174, 60 160 Z"
          fill="url(#leafGrad1)"
        />
        {/* Leaf 6 */}
        <path
          d="M80 200 C 65 190, 50 205, 45 220 C 62 228, 75 215, 80 200 Z"
          fill="url(#leafGrad2)"
        />
        {/* Leaf 7 - right side */}
        <path
          d="M140 230 C 155 205, 175 200, 195 205 C 185 225, 165 235, 140 230 Z"
          fill="url(#leafGrad1)"
        />
        {/* Leaf 8 - trailing low */}
        <path
          d="M175 245 C 195 235, 215 240, 230 250 C 215 262, 195 260, 175 245 Z"
          fill="url(#leafGrad3)"
        />
        {/* Leaf 9 - ground sprawl */}
        <path
          d="M100 240 C 90 255, 75 265, 55 270 C 60 252, 78 245, 100 240 Z"
          fill="url(#leafGrad2)"
        />

        {/* Blossom 1 - White Jasmine Flower */}
        <g transform="translate(75, 180)">
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(-5)" />
          <ellipse cx="13" cy="-4" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(68)" />
          <ellipse cx="8" cy="12" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(140)" />
          <ellipse cx="-8" cy="12" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(-140)" />
          <ellipse cx="-13" cy="-4" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(-68)" />
          <circle cx="0" cy="0" r="4.5" fill="#E6C86E" />
          <circle cx="0" cy="0" r="2.5" fill="#B38B32" />
        </g>

        {/* Blossom 2 - smaller jasmine flower near floor */}
        <g transform="translate(135, 245) scale(0.75)">
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="url(#petalGrad)" />
          <ellipse cx="13" cy="-4" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(72)" />
          <ellipse cx="8" cy="12" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(144)" />
          <ellipse cx="-8" cy="12" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(-144)" />
          <ellipse cx="-13" cy="-4" rx="7" ry="12" fill="url(#petalGrad)" transform="rotate(-72)" />
          <circle cx="0" cy="0" r="4.5" fill="#E6C86E" />
          <circle cx="0" cy="0" r="2.5" fill="#B38B32" />
        </g>
      </svg>

      {/* Right Ceramic Vase with Olive / Eucalyptus Branches & Stones */}
      <div
        className="pointer-events-none absolute bottom-0 -right-8 sm:-right-4 lg:-right-10 z-10 flex flex-col items-center select-none"
        aria-hidden="true"
      >
        <svg
          className="w-48 sm:w-60 lg:w-72 h-auto drop-shadow-[0_16px_22px_rgba(24,60,44,0.18)]"
          viewBox="0 0 280 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vaseGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EDE6D8" />
              <stop offset="35%" stopColor="#DFD6C4" />
              <stop offset="70%" stopColor="#C9BEA8" />
              <stop offset="100%" stopColor="#B2A68F" />
            </linearGradient>
            <linearGradient id="stoneGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D9D0C1" />
              <stop offset="100%" stopColor="#ABA08C" />
            </linearGradient>
            <linearGradient id="stoneGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2DAD0" />
              <stop offset="100%" stopColor="#B8ADA0" />
            </linearGradient>
            <linearGradient id="oliveLeaf1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#46644B" />
              <stop offset="100%" stopColor="#253E2A" />
            </linearGradient>
            <linearGradient id="oliveLeaf2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5E8064" />
              <stop offset="100%" stopColor="#304D36" />
            </linearGradient>
          </defs>

          {/* Tall Foliage Branches rising from Vase */}
          {/* Main branch 1 */}
          <path
            d="M175 220 C 180 160, 200 90, 230 30"
            stroke="#3C5642"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Main branch 2 */}
          <path
            d="M170 220 C 160 140, 140 80, 120 20"
            stroke="#3C5642"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Branch 3 */}
          <path
            d="M172 170 C 195 130, 225 100, 255 75"
            stroke="#3C5642"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Branch 4 */}
          <path
            d="M155 130 C 130 110, 105 95, 80 85"
            stroke="#3C5642"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Leaves on right branch */}
          <path d="M230 30 C 220 10, 240 5, 250 15 C 248 30, 238 35, 230 30 Z" fill="url(#oliveLeaf2)" />
          <path d="M218 60 C 235 48, 250 55, 255 68 C 240 76, 226 70, 218 60 Z" fill="url(#oliveLeaf1)" />
          <path d="M205 90 C 190 78, 195 62, 208 58 C 218 72, 214 85, 205 90 Z" fill="url(#oliveLeaf2)" />
          <path d="M225 100 C 245 92, 260 100, 264 112 C 248 120, 233 112, 225 100 Z" fill="url(#oliveLeaf1)" />
          <path d="M245 80 C 265 70, 275 80, 276 92 C 260 98, 250 90, 245 80 Z" fill="url(#oliveLeaf2)" />
          <path d="M192 130 C 210 120, 224 128, 226 140 C 210 146, 198 140, 192 130 Z" fill="url(#oliveLeaf1)" />

          {/* Leaves on left branch */}
          <path d="M120 20 C 112 5, 128 2, 136 12 C 134 25, 126 28, 120 20 Z" fill="url(#oliveLeaf2)" />
          <path d="M135 55 C 118 45, 110 58, 114 70 C 128 72, 136 64, 135 55 Z" fill="url(#oliveLeaf1)" />
          <path d="M148 90 C 162 76, 172 88, 170 100 C 156 104, 148 96, 148 90 Z" fill="url(#oliveLeaf2)" />
          <path d="M110 90 C 90 80, 80 92, 85 104 C 100 108, 110 100, 110 90 Z" fill="url(#oliveLeaf1)" />
          <path d="M85 85 C 65 76, 58 88, 62 98 C 76 102, 85 94, 85 85 Z" fill="url(#oliveLeaf2)" />

          {/* Ceramic Textured Vase */}
          {/* Vase Rim */}
          <ellipse cx="174" cy="222" rx="22" ry="7" fill="#C5BBA4" />
          <ellipse cx="174" cy="221" rx="19" ry="5.5" fill="#8C8068" />

          {/* Vase Body */}
          <path
            d="M155 222
               C 152 238, 142 250, 132 272
               C 118 304, 118 335, 130 360
               C 140 380, 160 388, 178 388
               C 198 388, 218 380, 226 360
               C 238 335, 238 304, 224 272
               C 214 250, 204 238, 201 222
               Z"
            fill="url(#vaseGrad)"
          />
          {/* Vase texture & shadow contour */}
          <path
            d="M190 224
               C 196 238, 204 250, 214 272
               C 226 304, 226 335, 216 360
               C 208 376, 196 384, 178 388
               C 192 386, 210 378, 218 358
               C 230 334, 230 304, 218 272
               C 208 250, 199 238, 196 224
               Z"
            fill="#000000"
            opacity="0.08"
          />

          {/* River Stones at Base of Vase */}
          {/* Shadow beneath stones */}
          <ellipse cx="85" cy="386" rx="42" ry="10" fill="#183C2C" opacity="0.12" />
          <ellipse cx="120" cy="390" rx="35" ry="8" fill="#183C2C" opacity="0.14" />
          <ellipse cx="178" cy="392" rx="45" ry="9" fill="#183C2C" opacity="0.15" />

          {/* Large Stone */}
          <path
            d="M60 370 C 65 348, 92 342, 110 355 C 122 364, 122 384, 108 390 C 88 396, 56 388, 60 370 Z"
            fill="url(#stoneGrad1)"
          />
          {/* Small Pebble */}
          <path
            d="M108 378 C 112 366, 128 364, 136 372 C 142 378, 140 388, 132 392 C 122 395, 106 388, 108 378 Z"
            fill="url(#stoneGrad2)"
          />
        </svg>
      </div>

      {/* Smartphone Frame housing the Video */}
      <div className="relative z-20 mx-auto w-[min(100%,305px)] sm:w-[min(100%,325px)] drop-shadow-[0_32px_45px_rgba(20,45,30,0.28)]">
        {/* Buttons on phone edge */}
        <span className="absolute top-24 -left-[3px] h-8 w-[3px] rounded-l bg-[#222]" />
        <span className="absolute top-36 -left-[3px] h-12 w-[3px] rounded-l bg-[#222]" />
        <span className="absolute top-32 -right-[3px] h-16 w-[3px] rounded-r bg-[#222]" />

        {/* Outer Phone Bezel */}
        <div className="relative rounded-[2.85rem] border-[10px] sm:border-[11px] border-[#161616] bg-[#0A0A0A] shadow-[inset_0_0_2px_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40">
          {/* Dynamic Island / Speaker */}
          <div className="absolute top-2.5 left-1/2 z-30 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-[#121212] shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <span className="absolute top-1/2 right-4.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#1c2333]/90 ring-1 ring-[#2e374d]/40" />
          </div>

          {/* Screen Content - EXISTING VIDEO */}
          <div className="overflow-hidden rounded-[2.2rem] bg-black">
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

        {/* Contact shadow on table surface */}
        <div
          className="mx-auto mt-2 h-4 w-4/5 rounded-full bg-[#183C2C]/20 blur-md"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
