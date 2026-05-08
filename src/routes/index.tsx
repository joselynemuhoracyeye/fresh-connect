import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Leaf, Truck, Snowflake, MapPin, Sun, ShoppingBasket, Database, Shield, Cloud, Zap, Sprout, ShoppingBag } from "lucide-react";
import heroFarmer from "@/assets/hero-farmer.jpg";
import produce from "@/assets/produce-flatlay.jpg";
import coldChain from "@/assets/cold-chain.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Nav() {
  return (
    <header className="container-x flex items-center justify-between py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
          <Leaf className="h-4 w-4" />
        </span>
        <span className="font-display text-xl tracking-tight">Soko</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm md:flex">
        <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
        <a href="#network" className="text-muted-foreground hover:text-foreground">Network</a>
        <a href="#farmers" className="text-muted-foreground hover:text-foreground">For farmers</a>
        <a href="#start" className="text-muted-foreground hover:text-foreground">Get started</a>
        <a href="#stack" className="text-muted-foreground hover:text-foreground">Platform</a>
        <a href="#impact" className="text-muted-foreground hover:text-foreground">Impact</a>
      </nav>
      <div className="flex items-center gap-2">
        <button className="hidden rounded-full px-4 py-2 text-sm text-foreground hover:bg-muted md:inline-flex">Sign in</button>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
          Start ordering <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="container-x grid gap-10 pb-20 pt-6 lg:grid-cols-12 lg:gap-14 lg:pt-10">
      <div className="lg:col-span-6 flex flex-col justify-center">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
          Harvested today · Delivered tomorrow
        </span>
        <h1 className="mt-6 text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
          Fresh from the <em className="not-italic text-clay">soil</em>,
          <br /> fast to your <em className="not-italic text-leaf">door</em>.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Soko is the cold-chain network that connects rural farmers directly with urban kitchens — cutting the middlemen, keeping the freshness, and paying growers fairly.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-95">
            Shop the harvest <ArrowUpRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-muted">
            I'm a farmer
          </button>
        </div>
        <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 text-sm">
          <div><dt className="text-muted-foreground">Farmers</dt><dd className="mt-1 font-display text-2xl">2,400+</dd></div>
          <div><dt className="text-muted-foreground">Districts</dt><dd className="mt-1 font-display text-2xl">18</dd></div>
          <div><dt className="text-muted-foreground">Avg. delivery</dt><dd className="mt-1 font-display text-2xl">14 hr</dd></div>
        </dl>
      </div>

      <div className="relative lg:col-span-6">
        <div className="relative overflow-hidden rounded-3xl shadow-lift">
          <img
            src={heroFarmer}
            alt="Farmer holding a basket of fresh produce at sunrise"
            width={1600}
            height={1200}
            className="h-[560px] w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-background/85 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-clay text-primary-foreground">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <div className="font-medium">Musanze · Northern Province</div>
                <div className="text-muted-foreground">Joseph K. · Tomatoes, peppers</div>
              </div>
            </div>
            <span className="rounded-full bg-leaf/15 px-3 py-1 text-xs font-medium text-leaf">In transit</span>
          </div>
        </div>
        <div className="absolute -left-6 top-10 hidden rotate-[-4deg] rounded-2xl bg-card p-3 shadow-lift md:block">
          <img src={produce} alt="" width={180} height={130} loading="lazy" className="h-28 w-44 rounded-xl object-cover" />
          <div className="mt-2 px-1 text-xs">
            <div className="font-medium">Today's harvest</div>
            <div className="text-muted-foreground">Picked 06:12 AM</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Sun, label: "Harvest", text: "Farmers list produce the morning it's picked, with photos and farm-gate price." },
    { icon: ShoppingBasket, label: "Collect", text: "Local hubs aggregate orders and prep crates for the next pickup window." },
    { icon: Snowflake, label: "Cold chain", text: "Refrigerated transport keeps produce at 4°C from village to city." },
    { icon: Truck, label: "Deliver", text: "Last-mile riders bring orders to homes, restaurants and shops." },
  ];
  return (
    <section id="how" className="container-x border-t border-border py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">The journey</p>
          <h2 className="mt-3 text-4xl md:text-5xl">From a hill in Musanze to a kitchen in Kigali — in 14 hours.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {steps.map((s, i) => (
            <div key={s.label} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl text-muted-foreground/40">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl">{s.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Network() {
  return (
    <section id="network" className="container-x py-24">
      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl lg:col-span-7">
          <img src={coldChain} alt="Refrigerated van on a rural road at sunrise" width={1400} height={1000} loading="lazy" className="h-full min-h-[420px] w-full object-cover" />
        </div>
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground lg:col-span-5">
          <p className="text-sm uppercase tracking-[0.2em] opacity-70">Cold chain network</p>
          <h2 className="mt-3 text-4xl">Built for produce that breathes.</h2>
          <p className="mt-4 text-primary-foreground/80">
            Insulated crates, refrigerated vans, and rural collection hubs keep temperature, humidity and time within strict bounds — so leafy greens arrive looking like they were just picked.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            {[
              ["32 collection hubs", "across 18 rural districts"],
              ["IoT temperature logs", "on every crate, end-to-end"],
              ["Smart route planning", "minimizing transit and fuel"],
            ].map(([h, t]) => (
              <li key={h} className="flex items-start gap-3 border-t border-primary-foreground/15 pt-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                <div>
                  <div className="font-medium">{h}</div>
                  <div className="text-primary-foreground/70">{t}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Farmers() {
  return (
    <section id="farmers" className="container-x py-24">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="p-10 md:p-14">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">For farmers</p>
            <h2 className="mt-3 text-4xl md:text-5xl">More of every franc <br />stays on the farm.</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Sell directly to thousands of urban customers, get paid via mobile money within 24 hours of delivery, and grow with demand forecasts and pickup scheduling.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              {[
                ["+62%", "average earnings vs. middlemen"],
                ["24 hr", "mobile-money payout"],
                ["3 taps", "to list a new harvest"],
                ["Free", "to join, no listing fees"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-clay">{n}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95">
              Join as a farmer <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative min-h-[400px] bg-muted">
            <img src={produce} alt="Flat lay of fresh organic produce" width={1400} height={1000} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const items = [
    { k: "−38%", v: "post-harvest loss across partner farms" },
    { k: "1.2M kg", v: "of produce moved last quarter" },
    { k: "4.9★", v: "average customer rating" },
  ];
  return (
    <section id="impact" className="container-x py-24">
      <div className="grid gap-12 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.v} className="border-t border-foreground pt-6">
            <div className="font-display text-6xl tracking-tight">{i.k}</div>
            <p className="mt-3 max-w-xs text-muted-foreground">{i.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const DISTRICTS = [
  "Kigali · Nyarugenge",
  "Kigali · Gasabo",
  "Kigali · Kicukiro",
  "Musanze · Northern",
  "Rubavu · Western",
  "Huye · Southern",
  "Nyagatare · Eastern",
  "Karongi · Western",
  "Muhanga · Southern",
];

function GetStarted() {
  const [role, setRole] = useState<"customer" | "farmer">("customer");
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [village, setVillage] = useState("");

  const isCustomer = role === "customer";

  return (
    <section id="start" className="container-x py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Get started</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Tell us who you are <br />and where you grow or eat.</h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Soko routes orders along the shortest cold-chain path between rural farms and urban kitchens. Pick your role and location to see hubs near you.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft lg:col-span-7">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "customer", label: "I'm a customer", desc: "Order weekly harvest boxes", Icon: ShoppingBag },
              { id: "farmer", label: "I'm a farmer", desc: "List & sell my produce", Icon: Sprout },
            ].map((r) => {
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as "customer" | "farmer")}
                  className={`group relative rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:border-foreground/40"
                  }`}
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? "bg-background/10" : "bg-primary/10 text-primary"}`}>
                    <r.Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 font-medium">{r.label}</div>
                  <div className={`mt-1 text-sm ${active ? "text-background/70" : "text-muted-foreground"}`}>{r.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {isCustomer ? "Delivery district" : "Farm district"}
              </span>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {isCustomer ? "Neighborhood / street" : "Village / sector"}
              </span>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
                <Sprout className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={isCustomer ? "e.g. Kimihurura" : "e.g. Kinigi sector"}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
              Nearest hub: <span className="font-medium text-foreground">{district.split(" · ")[0]} Hub</span>
            </div>
            <span className="text-muted-foreground">~14 hr to delivery</span>
          </div>

          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95">
            {isCustomer ? "Continue to the market" : "Continue as a farmer"} <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const items = [
    { Icon: Cloud, title: "Lovable Cloud", desc: "Managed backend powering auth, APIs and edge logic — no server to babysit." },
    { Icon: Database, title: "Postgres database", desc: "Relational store for farms, harvests, orders and cold-chain telemetry." },
    { Icon: Shield, title: "Row-level security", desc: "Per-role policies keep farmers, customers and admins in their own lane." },
    { Icon: Zap, title: "Realtime + AI ready", desc: "Live order tracking and a built-in AI gateway for forecasting demand." },
  ];
  return (
    <section id="stack" className="container-x py-24">
      <div className="rounded-3xl border border-border bg-cream p-10 md:p-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">The platform</p>
            <h2 className="mt-3 text-4xl md:text-5xl">A backend you can <em className="not-italic text-leaf">actually</em> build on.</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Soko runs on Lovable Cloud — a fully managed backend with a Postgres database, authentication, file storage and edge functions. Customers, farmers and operators all read and write through the same secure API.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {items.map((i) => (
              <div key={i.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf/15 text-leaf">
                  <i.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg">{i.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-x pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background md:p-16">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <h2 className="text-4xl md:text-6xl">Eat closer <br />to the source.</h2>
          <div>
            <p className="max-w-md text-background/70">
              Order this week's harvest box and taste the difference a short supply chain makes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground hover:opacity-95">
                Browse the market <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-background/20 px-6 py-3.5 text-sm font-medium hover:bg-background/10">
                Become a partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-3.5 w-3.5" />
          </span>
          <span className="font-display text-foreground">Soko</span>
          <span>· Kigali, Rwanda</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
        <div>© {new Date().getFullYear()} Soko Network</div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Network />
      <Farmers />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
}
