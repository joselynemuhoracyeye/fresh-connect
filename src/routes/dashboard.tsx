import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Leaf, Plus, LogOut, ImagePlus, Trash2, MapPin, ShoppingBasket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

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

function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [feed, setFeed] = useState<Product[]>([]);
  const [mine, setMine] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const loadAll = async () => {
    const { data: all } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60);
    setFeed((all ?? []) as Product[]);
    if (user) {
      const { data: own } = await supabase
        .from("products")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      setMine((own ?? []) as Product[]);
    }
    setLoaded(true);
  };

  useEffect(() => {
    if (user) loadAll();
  }, [user]);

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading...</div>;
  }

  const greeting = profile?.display_name || profile?.username || "friend";

  return (
    <main className="min-h-screen bg-cream grain">
      <header className="container-x flex items-center justify-between py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl">Soko</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <div className="text-sm font-medium">@{profile?.username}</div>
            <div className="text-xs text-muted-foreground">
              {profile?.district || "—"}{profile?.village ? ` · ${profile.village}` : ""}
            </div>
          </div>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:bg-muted"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      <section className="container-x">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Hello,</p>
              <h1 className="font-display text-4xl">Karibu, {greeting} 🌾</h1>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Browse today's harvest from farmers across Rwanda, or share a photo of produce you have to sell.
              </p>
            </div>
            <PostDialog onPosted={loadAll} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <Stat label="Listings near you" value={feed.length} />
            <Stat label="Your posts" value={mine.length} />
            <Stat label="Hubs" value={32} />
          </div>
        </div>

        <h2 className="mt-12 font-display text-2xl">Today's harvest</h2>
        <p className="text-sm text-muted-foreground">Fresh produce posted by farmers in the network.</p>

        {!loaded ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />)}
          </div>
        ) : feed.length === 0 ? (
          <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-card py-16">
            <ShoppingBasket className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">No produce posted yet. Be the first!</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feed.map((p) => (
              <ProductCard key={p.id} p={p} owned={p.owner_id === user.id} onDelete={loadAll} />
            ))}
          </div>
        )}

        <div className="h-20" />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-cream p-4">
      <div className="font-display text-2xl text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ProductCard({ p, owned, onDelete }: { p: Product; owned: boolean; onDelete: () => void }) {
  const remove = async () => {
    if (!confirm("Delete this listing?")) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success("Removed"); onDelete(); }
  };
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {p.image_url ? (
          <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground"><ImagePlus className="h-8 w-8" /></div>
        )}
        {owned && (
          <button onClick={remove} className="absolute right-2 top-2 rounded-full bg-background/90 p-2 text-destructive shadow hover:bg-background">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight">{p.title}</h3>
          {p.price_rwf != null && (
            <span className="whitespace-nowrap rounded-full bg-leaf/10 px-2.5 py-1 text-xs font-medium text-leaf">
              {p.price_rwf.toLocaleString()} RWF/{p.unit ?? "kg"}
            </span>
          )}
        </div>
        {p.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>}
        {p.district && (
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {p.district}
          </div>
        )}
      </div>
    </article>
  );
}

function PostDialog({ onPosted }: { onPosted: () => void }) {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTitle(""); setDescription(""); setPrice(""); setUnit("kg");
    setFile(null); setPreview(null);
  };

  const onPick = (f: File | null) => {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    let image_url: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("product-photos").upload(path, file, {
        cacheControl: "3600", upsert: false,
      });
      if (upErr) { setBusy(false); toast.error("Upload failed", { description: upErr.message }); return; }
      const { data } = supabase.storage.from("product-photos").getPublicUrl(path);
      image_url = data.publicUrl;
    }
    const { error } = await supabase.from("products").insert({
      owner_id: user.id,
      title,
      description: description || null,
      price_rwf: price ? parseInt(price, 10) : null,
      unit,
      image_url,
      district: profile?.district || null,
    });
    setBusy(false);
    if (error) toast.error("Could not post", { description: error.message });
    else {
      toast.success("Posted to the market");
      reset();
      setOpen(false);
      onPosted();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary"><Plus className="mr-1 h-4 w-4" /> Post produce</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share fresh produce</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>Photo</Label>
            <div
              onClick={() => fileRef.current?.click()}
              className="mt-1 grid aspect-[4/3] cursor-pointer place-items-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/40 hover:bg-muted"
            >
              {preview ? (
                <img src={preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                  <ImagePlus className="mx-auto h-8 w-8" />
                  <p className="mt-2">Click to upload a photo of your produce</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <Label htmlFor="t">Title</Label>
            <Input id="t" placeholder="Sweet potatoes, ripe avocados..." value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={80} />
          </div>
          <div>
            <Label htmlFor="ds">Description</Label>
            <Textarea id="ds" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={400} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="pr">Price (RWF)</Label>
              <Input id="pr" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="un">Per</Label>
              <select id="un" value={unit} onChange={(e) => setUnit(e.target.value)} className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
                <option value="kg">kg</option>
                <option value="bunch">bunch</option>
                <option value="piece">piece</option>
                <option value="basket">basket</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={busy || !title} className="w-full rounded-full bg-primary">
              {busy ? "Posting..." : "Post to the market"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
