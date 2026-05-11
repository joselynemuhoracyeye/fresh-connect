import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Leaf, Phone, ImagePlus, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/product/$id")({ component: ProductPage });

type Product = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  price_rwf: number | null;
  unit: string | null;
  image_url: string | null;
  district: string | null;
  created_at: string;
};

type Seller = {
  username: string;
  display_name: string | null;
  phone: string | null;
  district: string | null;
  village: string | null;
};

function ProductPage() {
  const { id } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    (async () => {
      const { data: p } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (!p) { setState("missing"); return; }
      setProduct(p as Product);
      const { data: s } = await supabase
        .from("profiles")
        .select("username,display_name,phone,district,village")
        .eq("id", (p as Product).owner_id)
        .maybeSingle();
      setSeller(s as Seller | null);
      setState("ok");
    })();
  }, [id]);

  if (state === "loading") {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading...</div>;
  }
  if (state === "missing" || !product) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream px-4 text-center">
        <div>
          <p className="text-muted-foreground">This listing is no longer available.</p>
          <Link to="/dashboard" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
            Back to market
          </Link>
        </div>
      </div>
    );
  }

  const created = new Date(product.created_at).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <main className="min-h-screen bg-cream grain">
      <header className="container-x flex items-center justify-between py-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to market
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl">Soko</span>
        </Link>
      </header>

      <section className="container-x grid gap-8 pb-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="aspect-[4/3] bg-muted">
              {product.image_url ? (
                <img src={product.image_url} alt={product.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-muted-foreground"><ImagePlus className="h-10 w-10" /></div>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            {product.district && (
              <div className="inline-flex items-center gap-1 rounded-full bg-leaf/10 px-3 py-1 text-xs font-medium text-leaf">
                <MapPin className="h-3 w-3" /> {product.district}
              </div>
            )}
            <h1 className="mt-3 font-display text-3xl leading-tight">{product.title}</h1>
            {product.price_rwf != null && (
              <p className="mt-2 text-2xl font-medium text-primary">
                {product.price_rwf.toLocaleString()} RWF
                <span className="text-base text-muted-foreground"> / {product.unit ?? "kg"}</span>
              </p>
            )}
            {product.description && (
              <p className="mt-4 whitespace-pre-line text-sm text-muted-foreground">{product.description}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" /> Posted {created}
            </div>

            {seller && (
              <div className="mt-6 rounded-2xl border border-border bg-cream p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Seller</p>
                <p className="mt-1 font-display text-lg">{seller.display_name || seller.username}</p>
                <p className="text-sm text-muted-foreground">@{seller.username}</p>
                {(seller.district || seller.village) && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {[seller.village, seller.district].filter(Boolean).join(", ")}
                  </p>
                )}
                {seller.phone ? (
                  <a
                    href={`tel:${seller.phone}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                  >
                    <Phone className="h-4 w-4" /> Contact seller
                  </a>
                ) : (
                  <p className="mt-3 text-xs text-muted-foreground">Seller has not added a phone number yet.</p>
                )}
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
