import { fetchTemplates, imageUrl } from "@/lib/api";
import Link from "next/link";
import ThemePicker from "@/components/templates/ThemePicker";
import { EmptyState, PageHeader, Panel } from "@/components/admin/ui";

export default async function TemplatesPage() {
  const templates = await fetchTemplates();

  return (
    <section>
      <PageHeader
        eyebrow="Catalog"
        title="Templates"
        description="Every invitation design guests can start from. Preview it, then edit the sample copy."
        meta={`${templates.length} designs`}
      />

      {templates.length === 0 ? (
        <EmptyState title="No templates yet" body="Templates imported into the database will appear here." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => {
            const hero = imageUrl(template.images, "hero");
            return (
              <Panel key={template.id} className="overflow-hidden">
                <div className="relative h-48 bg-[#1c1f24]">
                  {hero ? (
                    <img src={hero} alt={template.name} className="h-full w-full object-cover object-top" />
                  ) : null}
                  <span className="absolute top-3 left-3 rounded-full bg-[#1c1f24]/80 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur">
                    {template.categoryName || "Uncategorized"}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-[#111827]">{template.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-500">{template.description}</p>
                  <p className="mt-3 text-xs font-medium text-zinc-500">
                    Theme · {template.selectedThemeTitle || "None"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/preview/${template.slug}`}
                      className="inline-flex rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/preview/${template.slug}/edit`}
                      className="inline-flex rounded-full border border-[#e6e8ec] px-4 py-2 text-sm font-semibold text-[#111827] hover:border-[#111827]"
                    >
                      Edit
                    </Link>
                  </div>
                  <ThemePicker
                    slug={template.slug}
                    selectedThemeId={template.selectedThemeId}
                    themes={template.themes || []}
                  />
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </section>
  );
}
