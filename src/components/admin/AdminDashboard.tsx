"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_URL, imageUrl, type Category, type InvitationTemplate } from "@/lib/api";
import { useAdmin } from "./AdminContext";
import { EmptyState, PageHeader, Panel, StatusNote } from "./ui";

export default function AdminDashboard() {
  const { user } = useAdmin();
  const [categories, setCategories] = useState<Category[]>([]);
  const [templates, setTemplates] = useState<InvitationTemplate[]>([]);
  const [works, setWorks] = useState<InvitationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [categoryRes, templateRes, workRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`, { credentials: "include" }),
          fetch(`${API_URL}/api/templates`),
          fetch(`${API_URL}/api/works`, { credentials: "include" }),
        ]);
        const categoryData = (await categoryRes.json()) as { success?: boolean; categories?: Category[] };
        const templateData = (await templateRes.json()) as { success?: boolean; templates?: InvitationTemplate[] };
        const workData = (await workRes.json()) as { success?: boolean; works?: InvitationTemplate[] };

        if (!categoryRes.ok || !templateRes.ok || !workRes.ok) {
          throw new Error("Could not load studio");
        }

        setCategories(categoryData.categories || []);
        setTemplates(templateData.templates || []);
        setWorks(workData.works || []);
      } catch {
        setError("Could not load the studio overview.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const stats = useMemo(
    () => [
      { label: "Categories", value: categories.length, href: "/admin/categories", note: `${categories.filter((item) => item.isActive).length} live` },
      { label: "Templates", value: templates.length, href: "/admin/templates", note: "Catalog" },
      { label: "Works", value: works.length, href: "/admin/works", note: "Published invitations" },
    ],
    [categories, templates, works]
  );

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <section>
      <PageHeader
        eyebrow="Studio"
        title={`Good to see you, ${firstName}`}
        description="Catalog, templates, and customer invitations in one place."
      />

      {loading ? <StatusNote tone="muted">Loading the studio…</StatusNote> : null}
      {error ? <StatusNote tone="error">{error}</StatusNote> : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href} className="group">
                <Panel className="px-6 py-5 transition group-hover:border-[#cfd3d8]">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-tight text-[#111827]">{stat.value}</p>
                  <p className="mt-2 text-sm text-zinc-500">{stat.note}</p>
                </Panel>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-[#111827]">Recent works</h2>
                <Link href="/admin/works" className="text-sm font-semibold text-zinc-500 hover:text-[#111827]">
                  View all
                </Link>
              </div>
              {works.length === 0 ? (
                <EmptyState title="No works yet" body="Customer invitations appear here after they publish." />
              ) : (
                <div className="flex flex-col gap-3">
                  {works.slice(0, 4).map((work) => (
                    <Link key={work.id} href="/admin/works">
                      <Panel className="flex items-center gap-4 p-3 transition hover:border-[#cfd3d8]">
                        <Thumb src={imageUrl(work.images, "hero")} alt={work.name} />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#111827]">{work.name}</p>
                          <p className="truncate text-sm text-zinc-500">{work.categoryName || "Uncategorized"}</p>
                        </div>
                      </Panel>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-[#111827]">Templates</h2>
                <Link href="/admin/templates" className="text-sm font-semibold text-zinc-500 hover:text-[#111827]">
                  View all
                </Link>
              </div>
              {templates.length === 0 ? (
                <EmptyState title="No templates yet" body="Imported templates show up in the catalog." />
              ) : (
                <div className="flex flex-col gap-3">
                  {templates.slice(0, 4).map((template) => (
                    <Link key={template.id} href={`/preview/${template.slug}`}>
                      <Panel className="flex items-center gap-4 p-3 transition hover:border-[#cfd3d8]">
                        <Thumb src={imageUrl(template.images, "hero")} alt={template.name} />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#111827]">{template.name}</p>
                          <p className="truncate text-sm text-zinc-500">{template.categoryName || "Uncategorized"}</p>
                        </div>
                      </Panel>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      ) : null}
    </section>
  );
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  return src ? (
    <img src={src} alt={alt} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
  ) : (
    <span className="h-14 w-14 shrink-0 rounded-2xl bg-[#eef0f3]" />
  );
}
