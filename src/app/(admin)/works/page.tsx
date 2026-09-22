"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  API_URL,
  invitationLiveHref,
  invitationPreviewHref,
  type Category,
  type InvitationTemplate,
} from "@/lib/api";
import ThemePicker from "@/components/templates/ThemePicker";
import { imageUrl } from "@/lib/api";

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
    const response = await fetch(`${API_URL}/api/works`);
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
      fetch(`${API_URL}/api/categories`),
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">
          Works
          <span className="ml-2 text-base font-medium text-zinc-400">
            · {works.length} created
          </span>
        </h1>
        <button
          type="button"
          onClick={() => {
            setFormError("");
            setCategoryId("");
            setTemplateId("");
            setName("");
            setAdding(true);
          }}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          + Add Work
        </button>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading works...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : works.length === 0 ? (
        <div className="rounded-[28px] bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-zinc-800">No works yet</p>
          <p className="mt-1 text-zinc-500">Add a work from a category and template.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <article
              key={work.id}
              className="overflow-hidden rounded-3xl border border-white bg-white shadow-sm"
            >
              <div
                className={`relative h-48 overflow-hidden ${/house\s*warm/i.test(work.categoryName) ? "bg-[#fbf7f2]" : "bg-[#1a060c]"}`}
              >
                {imageUrl(work.images, "hero") ? (
                  <img
                    src={imageUrl(work.images, "hero")}
                    alt={work.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {work.categoryName || "Uncategorized"}
                </p>
                <h2 className="mt-1 text-lg font-bold text-zinc-900">{work.name}</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Template: {work.templateName || "Locked"}
                </p>
                <p className="mt-2 font-mono text-xs text-zinc-400">{work.slug}</p>
                <p className="mt-2 text-xs text-zinc-400">
                  Using {work.selectedThemeTitle || "no theme"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={invitationPreviewHref(work)}
                    className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`${invitationPreviewHref(work)}/edit`}
                    className="inline-flex rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white"
                  >
                    Edit
                  </Link>
                  <Link
                    href={invitationLiveHref(work)}
                    className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-800 hover:text-zinc-900"
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
            </article>
          ))}
        </div>
      )}

      {adding ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
            onSubmit={(event) => {
              event.preventDefault();
              void createWork();
            }}
          >
            <h2 className="text-xl font-bold text-zinc-900">Add Work</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Choose a category, then a template. Those cannot be changed later.
            </p>

            <label className="mt-5 block text-sm font-semibold text-zinc-700">
              Category
              <select
                value={categoryId}
                onChange={(event) => {
                  setCategoryId(event.target.value);
                  setTemplateId("");
                }}
                className="mt-1.5 w-full rounded-2xl border border-zinc-200 px-3 py-2.5 text-sm font-medium text-zinc-800"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-zinc-700">
              Template
              <select
                value={templateId}
                disabled={!categoryId}
                onChange={(event) => setTemplateId(event.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-zinc-200 px-3 py-2.5 text-sm font-medium text-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400"
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

            <label className="mt-4 block text-sm font-semibold text-zinc-700">
              Name
              <input
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
                placeholder="Used as the live URL"
                className="mt-1.5 w-full rounded-2xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-800"
              />
            </label>

            {formError ? <p className="mt-3 text-sm text-red-600">{formError}</p> : null}

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-500 hover:text-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
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
