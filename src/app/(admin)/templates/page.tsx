import { API_URL, type InvitationTemplate, imageUrl } from "@/lib/api";
import Link from "next/link";
import ThemePicker from "@/components/templates/ThemePicker";

async function getTemplates(): Promise<InvitationTemplate[]> {
  try {
    const response = await fetch(`${API_URL}/api/templates`, { cache: "no-store" });
    const data = (await response.json()) as {
      success?: boolean;
      templates?: InvitationTemplate[];
    };

    if (!response.ok || !data.success) {
      return [];
    }

    return data.templates || [];
  } catch {
    return [];
  }
}

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">
          Templates
          <span className="ml-2 text-base font-medium text-zinc-400">
            · {templates.length} available
          </span>
        </h1>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-[28px] bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-zinc-800">No templates yet</p>
          <p className="mt-1 text-zinc-500">Templates from the database will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="overflow-hidden rounded-3xl border border-white bg-white shadow-sm"
            >
              <div className={`relative h-48 overflow-hidden ${/house\s*warm/i.test(template.categoryName) ? "bg-[#fbf7f2]" : "bg-[#1a060c]"}`}>
                {imageUrl(template.images, "hero") ? (
                  <img
                    src={imageUrl(template.images, "hero")}
                    alt={template.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {template.categoryName || "Uncategorized"}
                </p>
                <h2 className="mt-1 text-lg font-bold text-zinc-900">{template.name}</h2>
                <p className="mt-1 text-sm text-zinc-500">{template.description}</p>
                <p className="mt-2 text-xs text-zinc-400">
                  Using {template.selectedThemeTitle || "no theme"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/preview/${template.slug}`}
                    className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/preview/${template.slug}/edit`}
                    className="inline-flex rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white"
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
