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

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
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
          <h1 className="mt-6 font-display text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to browse fresh harvests from rural farmers.
          </p>

          <Tabs defaultValue="username" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="username">Username</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="username" className="mt-4">
              <UsernameForm />
            </TabsContent>
            <TabsContent value="phone" className="mt-4">
              <PhoneForm />
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Soko?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function UsernameForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    });
    setBusy(false);
    if (error) toast.error("Could not sign in", { description: error.message });
    else toast.success("Welcome back");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="u">Username</Label>
        <Input id="u" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} />
      </div>
      <div>
        <Label htmlFor="p">Password</Label>
        <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-primary">
        {busy ? "Signing in..." : "Sign in"} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </form>
  );
}

function PhoneForm() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"phone" | "code">("phone");
  const [busy, setBusy] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setBusy(false);
    if (error) toast.error("Could not send code", { description: error.message });
    else {
      toast.success("Code sent to your phone");
      setStage("code");
    }
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
        <Label htmlFor="ph">Phone (with country code)</Label>
        <Input id="ph" type="tel" placeholder="+250 78 ..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-primary">
        {busy ? "Sending..." : "Send code"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Phone sign-in requires SMS to be enabled on the backend.
      </p>
    </form>
  ) : (
    <form onSubmit={verify} className="space-y-4">
      <div>
        <Label htmlFor="otp">6-digit code</Label>
        <Input id="otp" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} required />
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-primary">
        {busy ? "Verifying..." : "Verify"}
      </Button>
      <button type="button" onClick={() => setStage("phone")} className="w-full text-center text-sm text-muted-foreground hover:underline">
        Use a different number
      </button>
    </form>
  );
}
