"use client";

import { useAdmin } from "@/components/admin/AdminContext";
import { PageHeader, Panel } from "@/components/admin/ui";

export default function UsersPage() {
  const { user } = useAdmin();

  return (
    <section>
      <PageHeader
        eyebrow="Access"
        title="Users"
        description="The signed-in studio account. Customer invitations are managed from Works."
        meta="1 admin"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Panel className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">Signed in</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#111827]">{user?.name || "Admin"}</h2>
          <dl className="mt-6 divide-y divide-[#eee]">
            {[
              ["Email", user?.email || "—"],
              ["Phone", user?.phone || "—"],
              ["Role", user?.role === "admin" ? "Admin" : "Customer"],
              ["Email status", user?.emailVerified ? "Verified" : "Not verified"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-sm text-zinc-500">{label}</dt>
                <dd className="text-sm font-semibold text-[#111827]">{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">How access works</p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-zinc-600">
            <li>
              <span className="font-semibold text-[#111827]">Admins</span> manage categories, templates, and every published work.
            </li>
            <li>
              <span className="font-semibold text-[#111827]">Customers</span> sign up on the public site and edit only their own invitations.
            </li>
            <li>
              Published customer invitations show up under <span className="font-semibold text-[#111827]">Works</span>.
            </li>
          </ul>
        </Panel>
      </div>
    </section>
  );
}
