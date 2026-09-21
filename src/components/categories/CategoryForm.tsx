"use client";

import { useEffect, useState } from "react";

export type CategoryFormValues = {
  name: string;
  description: string;
  isActive: boolean;
  image: File | null;
};

type CategoryFormProps = {
  title: string;
  initialValues: {
    name: string;
    description: string;
    isActive: boolean;
    imageUrl?: string;
  };
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => void;
};

export default function CategoryForm({
  title,
  initialValues,
  saving,
  error,
  onClose,
  onSubmit,
}: CategoryFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [isActive, setIsActive] = useState(initialValues.isActive);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialValues.imageUrl || "");

  useEffect(() => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setIsActive(initialValues.isActive);
    setImage(null);
    setPreview(initialValues.imageUrl || "");
  }, [initialValues]);

  useEffect(() => {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({
            name: name.trim(),
            description: description.trim(),
            isActive,
            image,
          });
        }}
      >
        <h2 className="text-xl font-bold text-zinc-900">{title}</h2>

        <label className="mt-5 block text-sm font-medium text-zinc-600">
          Name
          <input
            className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-zinc-900 outline-none focus:border-accent"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Wedding"
            required
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-zinc-600">
          Description
          <textarea
            className="mt-1.5 min-h-24 w-full resize-none rounded-xl border border-zinc-200 px-3 py-2.5 text-zinc-900 outline-none focus:border-accent"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Short description"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-zinc-600">
          Image
          <input
            type="file"
            accept="image/*"
            className="mt-1.5 w-full text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
          />
        </label>

        {preview ? (
          <img
            src={preview}
            alt="Category preview"
            className="mt-3 h-28 w-full rounded-2xl object-cover"
          />
        ) : null}

        <label className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-700">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Active
        </label>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
