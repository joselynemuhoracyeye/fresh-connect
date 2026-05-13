import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Leaf, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, usernameToEmail } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: SignupPage });

const DISTRICTS = ["Kigali", "Musanze", "Huye", "Rubavu", "Nyagatare", "Karongi", "Muhanga", "Rwamagana", "Other"];

function SignupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  return (
    <main className="min-h-screen bg-cream grain">
      <div className="container-x flex min-h-screen items-center justify-center py-10">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-xl">Soko</span>
          </Link>
          <h1 className="mt-6 font-display text-3xl">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Join the harvest network in under a minute.</p>

          <Tabs defaultValue="username" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="username">Username</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="username" className="mt-4"><UsernameSignup /></TabsContent>
            <TabsContent value="phone" className="mt-4"><PhoneSignup /></TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function UsernameSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [village, setVillage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[a-z0-9_]{3,20}$/i.test(username)) {
      toast.error("Username must be 3–20 letters, numbers, or _");
      return;
    }
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      toast.error("Choose a stronger password", {
        description: "Use at least 10 characters with upper, lower case letters and a number. Avoid common passwords like 'password123'.",
      });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: usernameToEmail(username),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { username: username.toLowerCase().trim(), display_name: username, district, village },
      },
    });
    setBusy(false);
    if (error) toast.error("Sign up failed", { description: error.message });
    else toast.success("Account created");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="u">Username</Label>
        <Input id="u" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="p">Password</Label>
        <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="d">District</Label>
          <select id="d" value={district} onChange={(e) => setDistrict(e.target.value)} className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
            {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="v">Village/Area</Label>
          <Input id="v" value={village} onChange={(e) => setVillage(e.target.value)} />
        </div>
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-primary">
        {busy ? "Creating..." : "Create account"} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </form>
  );
}

function PhoneSignup() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"phone" | "code">("phone");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { data: { username: username.toLowerCase().trim(), display_name: username } },
    });
    setBusy(false);
    if (error) toast.error("Could not send code", { description: error.message });
    else { toast.success("Code sent"); setStage("code"); }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: code, type: "sms" });
    setBusy(false);
    if (error) toast.error("Invalid code", { description: error.message });
  };

  return stage === "phone" ? (
    <form onSubmit={sendCode} className="space-y-4">
      <div>
        <Label htmlFor="u2">Pick a username</Label>
        <Input id="u2" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="ph2">Phone (with country code)</Label>
        <Input id="ph2" type="tel" placeholder="+250 78 ..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-primary">
        {busy ? "Sending..." : "Send code"}
      </Button>
      <p className="text-xs text-muted-foreground">SMS must be enabled on the backend.</p>
    </form>
  ) : (
    <form onSubmit={verify} className="space-y-4">
      <div>
        <Label htmlFor="otp2">6-digit code</Label>
        <Input id="otp2" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} required />
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-primary">
        {busy ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}
