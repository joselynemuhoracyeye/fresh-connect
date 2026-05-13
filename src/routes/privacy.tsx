import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Soko" },
      { name: "description", content: "How Soko collects, uses, and protects your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream grain">
      <header className="container-x flex items-center justify-between py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl">Soko</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back home</Link>
      </header>
      <article className="container-x mx-auto max-w-3xl py-10 prose prose-stone">
        <h1 className="font-display text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 2026</p>
        <p className="mt-6">Soko collects only the information needed to connect farmers and customers: your username, district, optional phone number, and the produce listings you publish. We never sell your data.</p>
        <h2 className="mt-8 font-display text-2xl">What we store</h2>
        <ul className="mt-2 list-disc pl-6 text-muted-foreground">
          <li>Account details (username, district, village)</li>
          <li>Photos and details of produce you list</li>
          <li>Authentication metadata to keep your account secure</li>
        </ul>
        <h2 className="mt-8 font-display text-2xl">Your control</h2>
        <p className="mt-2 text-muted-foreground">You can delete your listings at any time from the dashboard. Contact us to delete your account.</p>
      </article>
    </main>
  );
}
