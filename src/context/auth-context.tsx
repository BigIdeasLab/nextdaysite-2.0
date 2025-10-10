"use client";

import { type Session, type SupabaseClient, type User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { createBrowserSupabaseClient } from "@/lib/api/supabase-browser";

type AuthContextValue = {
  client: SupabaseClient | null;
  session: Session | null;
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createBrowserSupabaseClient());
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function syncSession() {
      setLoading(true);
      const { data, error } = await client.auth.getSession();
      if (!isMounted) return;

      if (error) {
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }

    void syncSession();

    const { data: authListener } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return;
      }
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [client]);

  const value = useMemo<AuthContextValue>(
    () => ({
      client,
      session,
      user,
      loading,
      signInWithPassword: (params) => client.auth.signInWithPassword(params),
      signInWithOtp: (params) => client.auth.signInWithOtp({ email: params.email }),
      signUp: (params) => client.auth.signUp(params),
      signOut: () => client.auth.signOut(),
    }),
    [client, loading, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
