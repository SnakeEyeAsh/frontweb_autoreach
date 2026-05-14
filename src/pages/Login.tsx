import { useState, type FormEvent } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function CarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  )
}

export default function Login() {
  const { session, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0d0d1a' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid rgba(0,212,255,0.2)', borderTopColor: '#00d4ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (session) return <Navigate to="/dashboard" replace />

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
      display: 'flex',
      fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* ── Panel izquierdo (branding) ── */}
      <div style={{
        flex: '0 0 45%',
        background: 'linear-gradient(160deg, #0d0d1a 0%, #0f1a2e 60%, #0a1628 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,118,168,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #00d4ff, #0076a8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <CarIcon />
          </div>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#00d4ff', letterSpacing: '-0.5px' }}>
            Auto<span style={{ color: '#fff', fontWeight: 300 }}>Reach</span>
          </span>
        </Link>

        {/* Centro del panel */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#00d4ff', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Portal de cliente
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '16px' }}>
            Gestiona tu vehículo<br />
            <span style={{ color: '#00d4ff' }}>desde cualquier lugar</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(176,188,212,0.8)', lineHeight: 1.7, maxWidth: '320px' }}>
            Consulta tu historial, firma documentos y accede a toda la información de tus vehículos en un solo lugar.
          </p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '36px' }}>
            {['Historial completo de servicios', 'Firma digital de contratos', 'Acceso 24/7 desde cualquier dispositivo'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'rgba(176,188,212,0.7)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer del panel */}
        <div style={{ position: 'relative', zIndex: 1, fontSize: '12px', color: 'rgba(176,188,212,0.35)' }}>
          © {new Date().getFullYear()} AutoReach · La plataforma del concesionario moderno
        </div>
      </div>

      {/* ── Panel derecho (formulario) ── */}
      <div style={{
        flex: 1,
        background: '#f0f4f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 40px',
      }}>
        <div className="hero-anim" style={{ width: '100%', maxWidth: '400px' }}>

          {/* Cabecera del form */}
          <div style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '6px' }}>
              Iniciar sesión
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Accede a tu cuenta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Email */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '15px',
                  background: '#fff',
                  border: '1.5px solid #d1d9e3',
                  borderRadius: '10px',
                  color: '#111827',
                  outline: 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => { e.target.style.borderColor = '#0076a8'; e.target.style.boxShadow = '0 0 0 3px rgba(0,118,168,0.12)' }}
                onBlur={e => { e.target.style.borderColor = '#d1d9e3'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 14px',
                    fontSize: '15px',
                    background: '#fff',
                    border: '1.5px solid #d1d9e3',
                    borderRadius: '10px',
                    color: '#111827',
                    outline: 'none',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#0076a8'; e.target.style.boxShadow = '0 0 0 3px rgba(0,118,168,0.12)' }}
                  onBlur={e => { e.target.style.borderColor = '#d1d9e3'; e.target.style.boxShadow = 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#9ca3af', padding: '4px', display: 'flex', alignItems: 'center',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#0076a8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(220,38,38,0.08)',
                border: '1px solid rgba(220,38,38,0.25)',
                color: '#dc2626',
                padding: '11px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '15px',
                fontWeight: 700,
                background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #0076a8, #005c85)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s, transform 0.1s',
                boxShadow: submitting ? 'none' : '0 4px 14px rgba(0,118,168,0.3)',
                fontFamily: 'inherit',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.opacity = '0.9' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              {submitting && (
                <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              )}
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '13px', color: '#9ca3af' }}>
            <Link to="/" style={{ color: '#0076a8', textDecoration: 'none', fontWeight: 500 }}>
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
