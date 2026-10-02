"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { imageUrl, type Category, type InvitationTemplate } from "@/lib/api";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

function CategoryGlyph({ name }: { name: string }) {
  const label = name.toLowerCase();

  if (/house|home/.test(label)) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    );
  }

  if (/birth|cake/.test(label)) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 11V8m4 3V7m4 4V8M5 11h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z" />
        <path d="M5 15h14" />
      </svg>
    );
  }

  if (/wed|nikah|engag/.test(label)) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l1.8 2H17.5A2.5 2.5 0 0 1 20 9.5v7A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
    </svg>
  );
}

export default function TemplateGallery({
  categories,
  templates,
}: {
  categories: Category[];
  templates: InvitationTemplate[];
}) {
  const [selectedId, setSelectedId] = useState("all");

  const chips = useMemo(() => {
    if (categories.length > 0) {
      return categories;
    }

    const seen = new Map<string, Category>();

    for (const template of templates) {
      if (!template.categoryId || seen.has(template.categoryId)) {
        continue;
      }

      seen.set(template.categoryId, {
        id: template.categoryId,
        name: template.categoryName || "Invitation",
        description: "",
        isActive: true,
        imageUrl: "",
      });
    }

    return [...seen.values()];
  }, [categories, templates]);

  const visible = useMemo(
    () =>
      selectedId === "all"
        ? templates
        : templates.filter((template) => template.categoryId === selectedId),
    [selectedId, templates]
  );

  return (
    <section id="templates" className="w-full scroll-mt-24 px-6 pt-16 pb-24 md:px-10 md:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={`${display.className} text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl`}
        >
          Pick a design you&apos;ll love.
        </h2>
        <p className={`${display.className} mx-auto mt-4 max-w-xl text-lg text-zinc-500 italic`}>
          Filter by occasion and preview any design before you share it.
        </p>
        <div className="mx-auto mt-6 h-px w-16 bg-[#c4a574]" />
      </div>

      <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
        <button
          type="button"
          onClick={() => setSelectedId("all")}
          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
            selectedId === "all"
              ? "bg-[#143027] text-[#f3ead8]"
              : "bg-[#faf6ee] text-zinc-700 ring-1 ring-[#e7ddcf] hover:ring-[#c4a574]"
          }`}
        >
          All
        </button>
        {chips.map((category) => {
          const active = selectedId === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedId(category.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                active
                  ? "bg-[#143027] text-[#f3ead8]"
                  : "bg-[#faf6ee] text-zinc-700 ring-1 ring-[#e7ddcf] hover:ring-[#c4a574]"
              }`}
            >
              {category.imageUrl ? (
                <img src={category.imageUrl} alt="" className="h-5 w-5 rounded-full object-cover" />
              ) : (
                <CategoryGlyph name={category.name} />
              )}
              {category.name}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
        {visible.length} {visible.length === 1 ? "template" : "templates"}
      </p>

      {visible.length === 0 ? (
        <div className="mx-auto mt-6 max-w-lg rounded-[28px] bg-[#faf6ee] px-8 py-12 text-center shadow-sm">
          <p className={`${display.className} text-2xl text-zinc-800`}>No templates in this category</p>
          <p className="mt-2 text-zinc-500">Choose another occasion to see designs.</p>
        </div>
      ) : (
        <div className="mx-auto mt-6 flex max-w-6xl flex-wrap justify-center gap-6">
          {visible.map((template) => {
            const hero = imageUrl(template.images, "hero");
            const house = /house\s*warm/i.test(template.categoryName);

            return (
              <article
                key={template.id}
                className="group w-full max-w-[400px] overflow-hidden rounded-[32px] bg-[#faf6ee] shadow-[0_16px_40px_rgba(20,48,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,48,39,0.14)]"
              >
                <div className={`relative h-72 overflow-hidden ${house ? "bg-[#fbf7f2]" : "bg-[#1a060c]"}`}>
                  {hero ? (
                    <img
                      src={hero}
                      alt={template.name}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="px-6 py-6">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#8a7048] uppercase">
                    {template.categoryName || "Invitation"}
                  </p>
                  <h3 className={`${display.className} mt-2 text-2xl font-medium text-zinc-900`}>
                    {template.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">{template.description}</p>
                  <div className="mt-5 flex items-center gap-4">
                    <Link
                      href={`/preview/${template.slug}`}
                      className="inline-flex rounded-full bg-[#143027] px-5 py-2.5 text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/use/${template.slug}`}
                      className="inline-flex text-sm font-semibold text-[#143027] hover:text-[#8a7048]"
                    >
                      Use →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
