"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchUsers, type StudioUser } from "@/lib/api";
import { EmptyState, PageHeader, Panel, StatusNote } from "@/components/admin/ui";

export default function UsersPage() {
  const [users, setUsers] = useState<StudioUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setUsers(await fetchUsers());
        setError("");
      } catch {
        setError("Could not load users.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const counts = useMemo(() => {
    const admins = users.filter((user) => user.role === "admin").length;
    return {
      total: users.length,
      admins,
      customers: users.length - admins,
    };
  }, [users]);

  return (
    <section>
      <PageHeader
        eyebrow="Access"
        title="Users"
        description="Everyone with a Save the Kath account. Customers publish under Works; admins manage the studio."
        meta={`${counts.total} accounts · ${counts.admins} admin · ${counts.customers} customer`}
      />

      {loading ? <StatusNote tone="muted">Loading users…</StatusNote> : null}
      {error ? <StatusNote tone="error">{error}</StatusNote> : null}

      {!loading && !error && users.length === 0 ? (
        <EmptyState title="No users yet" body="Accounts appear here after signup." />
      ) : null}

      {!loading && !error && users.length > 0 ? (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#e6e8ec] bg-[#fafbfc] text-[11px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Email status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#fafbfc]">
                    <td className="px-5 py-3.5 font-semibold text-[#111827]">{user.name}</td>
                    <td className="px-5 py-3.5 text-zinc-600">{user.email}</td>
                    <td className="px-5 py-3.5 text-zinc-600">{user.phone || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${
                          user.role === "admin"
                            ? "bg-[#111827] text-white"
                            : "bg-[#eef0f3] text-[#3f4550]"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">
                      {user.emailVerified ? "Verified" : "Not verified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ) : null}
    </section>
  );
}
