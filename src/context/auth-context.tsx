'use client'

import {
  type Session,
  type SupabaseClient,
  type User,
} from '@supabase/supabase-js'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { createBrowserSupabaseClient } from '@/lib/api/supabase-browser'

type AuthContextValue = {
  client: SupabaseClient | null
  session: Session | null
  user: User | null
  loading: boolean
  isConfigured: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createBrowserSupabaseClient())
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    if (!client) {
      setSession(null)
      setUser(null)
      setLoading(false)
      return () => {
        isMounted = false
      }
    }

    async function handleMagicLink() {
      if (
        typeof window !== 'undefined' &&
        window.location.hash.includes('access_token')
      ) {
        const params = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        if (accessToken && refreshToken) {
          setLoading(true)
          const { data, error } = await client.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error(
              '[AuthProvider] Error setting session from magic link:',
              error,
            )
          } else {
            setSession(data.session)
            setUser(data.session?.user ?? null)
          }
          // Clean up the URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          )
          setLoading(false)
        }
      }
    }

    void handleMagicLink()

    const { data: authListener } = client.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!isMounted) {
          return
        }
        // Only set the session if it's not already set by the magic link handler
        if (!session) {
          setSession(nextSession)
          setUser(nextSession?.user ?? null)
        }
        setLoading(false)
      },
    )

    return () => {
      isMounted = false
      authListener?.subscription.unsubscribe()
    }
  }, [client, session])

  const value = useMemo<AuthContextValue>(
    () => ({
      client,
      session,
      user,
      loading,
      isConfigured: Boolean(client),
    }),
    [client, loading, session, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
