import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', background: 'var(--navy)',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Cargando...</div>
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}
