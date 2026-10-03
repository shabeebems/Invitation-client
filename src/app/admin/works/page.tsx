"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  API_URL,
  imageUrl,
  invitationLiveHref,
  invitationPreviewHref,
  type Category,
  type InvitationTemplate,
} from "@/lib/api";
import ThemePicker from "@/components/templates/ThemePicker";
import { EmptyState, PageHeader, Panel, PrimaryButton, StatusNote } from "@/components/admin/ui";

export default function WorksPage() {
  const [works, setWorks] = useState<InvitationTemplate[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [templates, setTemplates] = useState<InvitationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [name, setName] = useState("");

  const categoryTemplates = useMemo(
    () => templates.filter((template) => template.categoryId === categoryId),
    [templates, categoryId]
  );

  async function loadWorks() {
    const response = await fetch(`${API_URL}/api/works`, { credentials: "include" });
    const data = (await response.json()) as {
      success?: boolean;
      works?: InvitationTemplate[];
      message?: string;
    };

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to load works");
    }

    setWorks(data.works || []);
  }

  async function loadLookups() {
    const [categoryRes, templateRes] = await Promise.all([
      fetch(`${API_URL}/api/categories`, { credentials: "include" }),
      fetch(`${API_URL}/api/templates`),
    ]);
    const categoryData = (await categoryRes.json()) as {
      success?: boolean;
      categories?: Category[];
    };
    const templateData = (await templateRes.json()) as {
      success?: boolean;
      templates?: InvitationTemplate[];
    };

    setCategories(categoryData.categories || []);
    setTemplates(templateData.templates || []);
  }

  useEffect(() => {
    async function load() {
      try {
        await Promise.all([loadWorks(), loadLookups()]);
        setError("");
      } catch {
        setError("Could not load works.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function createWork() {
    if (!categoryId) {
      setFormError("Select a category first");
      return;
    }

    if (!templateId) {
      setFormError("Select a template");
      return;
    }

    if (!name.trim()) {
      setFormError("Name is required");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const response = await fetch(`${API_URL}/api/works`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          templateId,
          name: name.trim(),
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        work?: InvitationTemplate;
      };

      if (!response.ok || !data.success || !data.work) {
        throw new Error(data.message || "Could not create work");
      }

      setAdding(false);
      setCategoryId("");
      setTemplateId("");
      setName("");
      await loadWorks();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not create work");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="Studio"
        title="Works"
        description="Published invitations. Open one to preview, edit, or view the live link."
        meta={`${works.length} live`}
        action={
          <PrimaryButton
            onClick={() => {
              setFormError("");
              setCategoryId("");
              setTemplateId("");
              setName("");
              setAdding(true);
            }}
          >
            Add work
          </PrimaryButton>
        }
      />

      {loading ? (
        <StatusNote tone="muted">Loading works…</StatusNote>
      ) : error ? (
        <StatusNote tone="error">{error}</StatusNote>
      ) : works.length === 0 ? (
        <EmptyState title="No works yet" body="Create one from a category and template, or wait for a customer to publish." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => {
            const hero = imageUrl(work.images, "hero");
            return (
              <Panel key={work.id} className="overflow-hidden">
                <div className="relative h-44 bg-[#1c1f24]">
                  {hero ? (
                    <img src={hero} alt={work.name} className="h-full w-full object-cover object-top" />
                  ) : null}
                  <span className="absolute top-3 left-3 rounded-full bg-[#111827]/80 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur">
                    {work.categoryName || "Uncategorized"}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-[#111827]">{work.name}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{work.templateName || "Locked template"}</p>
                  <p className="mt-2 font-mono text-xs text-zinc-400">/{work.slug}</p>
                  <p className="mt-2 text-xs font-medium text-zinc-500">
                    Theme · {work.selectedThemeTitle || "None"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={invitationPreviewHref(work)}
                      className="inline-flex rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`${invitationPreviewHref(work)}/edit`}
                      className="inline-flex rounded-full border border-[#e6e8ec] px-4 py-2 text-sm font-semibold text-[#111827] hover:border-[#111827]"
                    >
                      Edit
                    </Link>
                    <Link
                      href={invitationLiveHref(work)}
                      className="inline-flex rounded-full border border-[#e6e8ec] px-4 py-2 text-sm font-semibold text-zinc-600 hover:border-[#111827] hover:text-[#111827]"
                    >
                      Live
                    </Link>
                  </div>
                  <ThemePicker
                    slug={work.slug}
                    selectedThemeId={work.selectedThemeId}
                    themes={work.themes || []}
                    source="work"
                  />
                </div>
              </Panel>
            );
          })}
        </div>
      )}

      {adding ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <form
            className="w-full max-w-md rounded-[28px] border border-[#e6e8ec] bg-white p-6 shadow-xl"
            onSubmit={(event) => {
              event.preventDefault();
              void createWork();
            }}
          >
            <h2 className="text-xl font-semibold text-[#111827]">Add work</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Choose a category, then a template. Those stay locked after you create it.
            </p>

            <label className="mt-5 block text-sm font-semibold text-[#111827]">
              Category
              <select
                value={categoryId}
                onChange={(event) => {
                  setCategoryId(event.target.value);
                  setTemplateId("");
                }}
                className="mt-1.5 w-full rounded-2xl border border-[#e6e8ec] bg-white px-3 py-2.5 text-sm font-medium text-[#111827]"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-[#111827]">
              Template
              <select
                value={templateId}
                disabled={!categoryId}
                onChange={(event) => setTemplateId(event.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-[#e6e8ec] bg-white px-3 py-2.5 text-sm font-medium text-[#111827] disabled:bg-[#f4f5f7] disabled:text-zinc-400"
              >
                <option value="">
                  {categoryId ? "Select template" : "Select a category first"}
                </option>
                {categoryTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-[#111827]">
              Name
              <input
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
                placeholder="Used as the live URL"
                className="mt-1.5 w-full rounded-2xl border border-[#e6e8ec] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none focus:border-[#111827]"
              />
            </label>

            {formError ? <p className="mt-3 text-sm font-medium text-red-700">{formError}</p> : null}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-500 hover:text-[#111827]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
              >
                {saving ? "Creating…" : "Create work"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
