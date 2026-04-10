import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { session, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--navy)' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Cargando...</div>
      </div>
    )
  }

  if (session) return <Navigate to="/" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const err = await signIn(email, password)
    if (err) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Decoración de fondo */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(0,188,212,0.06)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(0,188,212,0.04)',
        }} />
      </div>

      <div style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
        {/* Branding */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-1px', marginBottom: '6px' }}>
            AutoReach
          </div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
            Gestión de tu vehículo
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '36px 32px',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
              Iniciar sesión
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              Accede a tu cuenta para continuar
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                }}
              />
            </div>

            <div>
              <label style={{ color: 'rgba(255,255,255,0.5)' }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(229,57,53,0.12)',
                border: '1px solid rgba(229,57,53,0.3)',
                color: '#ff8a80',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', marginTop: '4px', padding: '12px', fontSize: '15px' }}
            >
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
