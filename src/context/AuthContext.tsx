import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const TOKEN_KEY = 'ar_token'
const API_URL = import.meta.env.VITE_API_URL as string

interface AuthContextType {
  token: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY))
    setLoading(false)
  }, [])

  async function signIn(email: string, password: string): Promise<string | null> {
    try {
      const res = await fetch(`${API_URL}/api/clientes/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const body = await res.json()
      if (!res.ok) return body.error ?? 'Credenciales incorrectas'
      localStorage.setItem(TOKEN_KEY, body.token)
      setToken(body.token)
      return null
    } catch {
      return 'Error de conexión'
    }
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
