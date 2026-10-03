"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URL, type Category } from "@/lib/api";
import CategoryForm, { type CategoryFormValues } from "@/components/categories/CategoryForm";
import { EmptyState, PageHeader, Panel, PrimaryButton, StatusNote } from "@/components/admin/ui";

const swatches = ["#fde8ef", "#f8edd2", "#d9f3ef", "#ead8f3", "#e7e7ea"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState<"closed" | "add" | "edit">("closed");
  const [editing, setEditing] = useState<Category | null>(null);

  const activeCount = useMemo(
    () => categories.filter((category) => category.isActive).length,
    [categories]
  );

  async function loadCategories() {
    try {
      const response = await fetch(`${API_URL}/api/categories`, { credentials: "include" });
      const data = (await response.json()) as {
        success?: boolean;
        categories?: Category[];
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load categories");
      }

      setCategories(data.categories || []);
      setError("");
    } catch {
      setError("Could not load categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function saveCategory(values: CategoryFormValues) {
    if (!values.name) {
      setFormError("Name is required");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const isEdit = mode === "edit" && editing;
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("isActive", String(values.isActive));

      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await fetch(
        isEdit ? `${API_URL}/api/categories/${editing.id}` : `${API_URL}/api/categories`,
        {
          method: isEdit ? "PUT" : "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Save failed");
      }

      setMode("closed");
      setEditing(null);
      await loadCategories();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not save category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="Catalog"
        title="Categories"
        description="Groups that organize the template gallery and the details form."
        meta={`${activeCount} active`}
        action={
          <PrimaryButton
            onClick={() => {
              setEditing(null);
              setFormError("");
              setMode("add");
            }}
          >
            Add category
          </PrimaryButton>
        }
      />

      {loading ? (
        <StatusNote tone="muted">Loading categories…</StatusNote>
      ) : error ? (
        <StatusNote tone="error">{error}</StatusNote>
      ) : categories.length === 0 ? (
        <EmptyState title="No categories yet" body="Add a category before importing templates into it." />
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((category, index) => (
            <Panel key={category.id} className="flex items-center gap-4 px-4 py-4 sm:px-5">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                />
              ) : (
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-[#111827]"
                  style={{ backgroundColor: swatches[index % swatches.length] }}
                >
                  {category.name.slice(0, 1)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-[#111827]">{category.name}</p>
                <p className="truncate text-sm text-zinc-500">
                  {category.description || "No description"}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${
                  category.isActive
                    ? "bg-[#e7f3ec] text-[#1d6b45]"
                    : "bg-[#f0f1f3] text-zinc-500"
                }`}
              >
                {category.isActive ? "Live" : "Hidden"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEditing(category);
                  setFormError("");
                  setMode("edit");
                }}
                className="rounded-full border border-[#e6e8ec] px-3 py-1.5 text-sm font-semibold text-[#111827] hover:border-[#111827]"
              >
                Edit
              </button>
            </Panel>
          ))}
        </div>
      )}

      {mode !== "closed" ? (
        <CategoryForm
          title={mode === "edit" ? "Edit Category" : "Add Category"}
          initialValues={{
            name: editing?.name || "",
            description: editing?.description || "",
            isActive: editing?.isActive ?? true,
            imageUrl: editing?.imageUrl || "",
          }}
          saving={saving}
          error={formError}
          onClose={() => {
            setMode("closed");
            setEditing(null);
            setFormError("");
          }}
          onSubmit={saveCategory}
        />
      ) : null}
    </section>
  );
}
