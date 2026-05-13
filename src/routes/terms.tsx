import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Soko" },
      { name: "description", content: "The rules for using the Soko marketplace." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
        <h1 className="font-display text-4xl">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 2026</p>
        <p className="mt-6">By using Soko you agree to list only produce you actually have, describe it honestly, and treat other users with respect.</p>
        <h2 className="mt-8 font-display text-2xl">Listings</h2>
        <p className="mt-2 text-muted-foreground">You are responsible for the accuracy of prices, units, photos, and availability. Soko may remove listings that are misleading or unsafe.</p>
        <h2 className="mt-8 font-display text-2xl">Liability</h2>
        <p className="mt-2 text-muted-foreground">Soko is a connection platform. Buyers and sellers transact directly and are responsible for fulfilment, payment, and quality.</p>
      </article>
    </main>
  );
}
