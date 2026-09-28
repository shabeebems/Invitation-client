import type { Metadata } from "next";
import Link from "next/link";
import AccountCta from "@/components/landing/AccountCta";
import SiteNav from "@/components/landing/SiteNav";
import { API_URL, imageUrl, type InvitationTemplate } from "@/lib/api";

export const metadata: Metadata = {
  title: "Inviteo",
  description: "Digital invitations for weddings, housewarmings, and celebrations.",
};

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

    return (data.templates || []).filter((template) => template.isActive);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const templates = await getTemplates();
  const featured = templates[0];
  const featuredImage = featured ? imageUrl(featured.images, "hero") : "";

  return (
    <div className="min-h-full bg-page">
      <SiteNav />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
              Digital invitations
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 md:text-5xl">
              A page your guests will actually open.
            </h1>
            <p className="mt-4 max-w-md text-lg text-zinc-600">
              Inviteo turns a wedding, housewarming, or celebration into one link. Names, dates,
              maps, and photos stay on the invitation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#previews"
                className="rounded-full bg-sidebar px-5 py-3 text-sm font-semibold text-white hover:bg-sidebar-muted"
              >
                See previews
              </a>
              <AccountCta />
            </div>
          </div>

          {featured ? (
            <Link
              href={`/preview/${featured.slug}`}
              className="group overflow-hidden rounded-[28px] bg-white shadow-sm"
            >
              <div
                className={`relative h-72 overflow-hidden ${
                  /house\s*warm/i.test(featured.categoryName) ? "bg-[#fbf7f2]" : "bg-[#1a060c]"
                }`}
              >
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={featured.name}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  />
                ) : null}
              </div>
              <div className="px-6 py-5">
                <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {featured.categoryName || "Invitation"}
                </p>
                <h2 className="mt-1 text-xl font-bold text-zinc-900">{featured.name}</h2>
                <p className="mt-1 text-sm text-zinc-500">{featured.description}</p>
              </div>
            </Link>
          ) : null}
        </section>

        <section id="previews" className="mx-auto max-w-6xl px-5 pb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Invitation previews</h2>
            <p className="mt-2 text-zinc-500">Open a design and see how it reads for a guest.</p>
          </div>

          {templates.length === 0 ? (
            <div className="rounded-[28px] bg-white px-8 py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-zinc-800">No previews yet</p>
              <p className="mt-1 text-zinc-500">Invitation designs will show up here.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {templates.map((template) => {
                const hero = imageUrl(template.images, "hero");

                return (
                  <article
                    key={template.id}
                    className="overflow-hidden rounded-[28px] bg-white shadow-sm"
                  >
                    <div
                      className={`relative h-56 overflow-hidden ${
                        /house\s*warm/i.test(template.categoryName) ? "bg-[#fbf7f2]" : "bg-[#1a060c]"
                      }`}
                    >
                      {hero ? (
                        <img
                          src={hero}
                          alt={template.name}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : null}
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                        {template.categoryName || "Invitation"}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-zinc-900">{template.name}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{template.description}</p>
                      <Link
                        href={`/preview/${template.slug}`}
                        className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
                      >
                        Preview
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
