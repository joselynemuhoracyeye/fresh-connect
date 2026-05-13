import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Soko" },
      { name: "description", content: "Reach the Soko team for support, partnerships, or press." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
      <section className="container-x mx-auto max-w-3xl py-10">
        <h1 className="font-display text-4xl">Get in touch</h1>
        <p className="mt-4 text-muted-foreground">We'd love to hear from farmers, customers, and partners.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href="mailto:hello@soko.rw" className="rounded-2xl border border-border bg-card p-5 hover:shadow-soft">
            <Mail className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">hello@soko.rw</p>
          </a>
          <a href="tel:+250788000000" className="rounded-2xl border border-border bg-card p-5 hover:shadow-soft">
            <Phone className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">+250 788 000 000</p>
          </a>
          <div className="rounded-2xl border border-border bg-card p-5">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-medium">Office</p>
            <p className="text-sm text-muted-foreground">Kigali, Rwanda</p>
          </div>
        </div>
      </section>
    </main>
  );
}
