"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URL, type Category } from "@/lib/api";
import CategoryForm, { type CategoryFormValues } from "@/components/categories/CategoryForm";

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
      const response = await fetch(`${API_URL}/api/categories`);
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">
          Categories
          <span className="ml-2 text-base font-medium text-zinc-400">
            · {activeCount} active
          </span>
        </h1>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setFormError("");
            setMode("add");
          }}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading categories...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : categories.length === 0 ? (
        <div className="rounded-[28px] bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-zinc-800">No categories yet</p>
          <p className="mt-1 text-zinc-500">Add a category to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((category, index) => (
            <article
              key={category.id}
              className="flex items-center gap-4 rounded-2xl border border-white bg-white px-5 py-4 shadow-sm"
            >
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-12 w-12 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <span
                  className="h-12 w-12 shrink-0 rounded-xl"
                  style={{ backgroundColor: swatches[index % swatches.length] }}
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-zinc-900">{category.name}</p>
                <p className="truncate text-sm text-zinc-400">
                  {category.description || "No description"}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  category.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-zinc-200 text-zinc-500"
                }`}
              >
                {category.isActive ? "ACTIVE" : "HIDDEN"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEditing(category);
                  setFormError("");
                  setMode("edit");
                }}
                className="text-sm font-semibold text-zinc-500 hover:text-accent"
              >
                Edit
              </button>
            </article>
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
