import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

/* ── Icons ── */
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  )
}
function CarIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  )
}
function DocIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  )
}
function DashboardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
  )
}
function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  )
}
function PhoneIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
    </svg>
  )
}
function KeyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  )
}
function PenIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  )
}
function RocketIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10l4.5-4.5s1.45-.04 2.69.85zm-.04 11.69c.31-.13 3.58-1.53 5.89-3.57.89 1.24.85 2.69.85 2.69L11.5 21.5l-2.35-3.46zm11.99-10.1c.15 5.23-3.61 9.77-7.83 11.91L7.95 14.49C10.1 10.27 14.65 6.5 19.87 6.66c.16.43.25.89.27 1.28zM14.5 9.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM3.5 17c-.42 1.18-.63 2.58-.63 2.58s1.4-.21 2.58-.63c-.49-.49-1.46-1.46-1.95-1.95z"/>
    </svg>
  )
}

type IconComponent = React.FC

/* ── Data ── */

const features: { Icon: IconComponent; title: string; desc: string; href?: string }[] = [
  { Icon: CarIcon as IconComponent, title: 'Tus vehículos', desc: 'Ficha técnica, kilometraje e historial completo de cada coche. Todo en un sitio, siempre actualizado.' },
  { Icon: WrenchIcon, title: 'Historial de servicios', desc: 'Cada reparación y revisión bien guardada. Consulta qué se hizo y cuándo en cualquier momento.' },
  { Icon: DocIcon, title: 'Firma de documentos', desc: 'Firma contratos, garantías y facturas digitalmente desde cualquier dispositivo. Sin papel, sin esperas.' },
  { Icon: DashboardIcon, title: 'Panel de control', desc: 'Un vistazo y ya sabes todo: vehículos activos, gestiones recientes y documentos pendientes.' },
  { Icon: LockIcon, title: 'Seguro y privado', desc: 'Tus datos protegidos con autenticación segura. Solo tú accedes a tu información.' },
  { Icon: PhoneIcon as IconComponent, title: 'App móvil', desc: 'Lleva tu concesionario en el bolsillo. Gestiona tus vehículos y recibe notificaciones desde cualquier sitio.', href: 'https://raid-el-martinez.com/downloads/AutoReach.apk' },
]

const steps: { num: string; Icon: IconComponent; title: string; desc: string }[] = [
  { num: '01', Icon: KeyIcon, title: 'Entra con tu cuenta', desc: 'Accede con tus credenciales de cliente. Rápido, seguro y sin complicaciones.' },
  { num: '02', Icon: CarIcon as IconComponent, title: 'Revisa tus vehículos', desc: 'Consulta el estado, historial y documentos de todos tus coches registrados.' },
  { num: '03', Icon: PenIcon, title: 'Firma tus documentos', desc: 'Firma digitalmente contratos y garantías directamente desde la plataforma.' },
]

const perks = ['Sin instalación', 'Acceso inmediato', 'Siempre disponible']

/* ── Component ── */
export default function Landing() {
  const { isDark, toggleTheme } = useTheme()

  const c = isDark ? {
    pageBg: '#10102a',
    navBg: 'rgba(13,13,26,0.85)',
    navBorder: 'rgba(0,212,255,0.1)',
    text: '#f0f0f5',
    textMuted: '#b0bcd4',
    textFaint: 'rgba(176,188,212,0.35)',
    cardBg: 'linear-gradient(145deg, rgba(28,35,64,0.9) 0%, rgba(26,26,46,0.7) 100%)',
    cardBorder: 'rgba(0,212,255,0.18)',
    statBg: 'rgba(28,35,64,0.7)',
    statBorder: 'rgba(0,212,255,0.18)',
    howBg: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(99,102,241,0.06) 100%)',
    howBorder: 'rgba(0,212,255,0.15)',
    ctaBg: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(99,102,241,0.07) 100%)',
    ctaBorder: 'rgba(0,212,255,0.25)',
    stepBg: 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(0,212,255,0.07))',
    stepBorder: 'rgba(0,212,255,0.3)',
    navLinkColor: '#b0bcd4',
    disabledBg: 'rgba(255,255,255,0.04)',
    disabledBorder: 'rgba(255,255,255,0.1)',
    disabledText: 'rgba(176,188,212,0.35)',
    perkCheck: 'rgba(0,212,255,0.18)',
    footerBorder: 'rgba(0,212,255,0.1)',
    toggleBg: 'rgba(0,212,255,0.08)',
    toggleColor: '#b0bcd4',
    blobA: 'radial-gradient(circle, rgba(0,212,255,0.13) 0%, transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
    blobC: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
    titleColor: '#f0f0f5',
    iconColor: '#b0bcd4',
    accentGrad: 'linear-gradient(135deg, #00d4ff, #00acc1)',
    accentShadow: 'rgba(0,212,255,0.35)',
    accentShadowHover: 'rgba(0,212,255,0.5)',
  } : {
    pageBg: '#f0f4f8',
    navBg: 'rgba(255,255,255,0.95)',
    navBorder: '#d1d9e3',
    text: '#111827',
    textMuted: '#4b5563',
    textFaint: 'rgba(17,24,39,0.3)',
    cardBg: '#ffffff',
    cardBorder: '#d1d9e3',
    statBg: '#ffffff',
    statBorder: '#d1d9e3',
    howBg: 'linear-gradient(135deg, rgba(0,118,168,0.04) 0%, rgba(99,102,241,0.03) 100%)',
    howBorder: '#d1d9e3',
    ctaBg: 'linear-gradient(135deg, rgba(0,118,168,0.06) 0%, rgba(99,102,241,0.04) 100%)',
    ctaBorder: 'rgba(0,118,168,0.2)',
    stepBg: 'rgba(0,118,168,0.07)',
    stepBorder: 'rgba(0,118,168,0.18)',
    navLinkColor: '#4b5563',
    disabledBg: 'rgba(0,0,0,0.04)',
    disabledBorder: '#d1d9e3',
    disabledText: 'rgba(17,24,39,0.3)',
    perkCheck: 'rgba(0,118,168,0.1)',
    footerBorder: '#d1d9e3',
    toggleBg: 'rgba(0,0,0,0.05)',
    toggleColor: '#4b5563',
    blobA: 'radial-gradient(circle, rgba(0,118,168,0.06) 0%, transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)',
    blobC: 'radial-gradient(circle, rgba(0,118,168,0.04) 0%, transparent 70%)',
    titleColor: '#111827',
    iconColor: '#4b5563',
    accentGrad: 'linear-gradient(135deg, #0076a8, #005c85)',
    accentShadow: 'rgba(0,118,168,0.25)',
    accentShadowHover: 'rgba(0,118,168,0.4)',
  }

  return (
    <div style={{ minHeight: '100vh', background: c.pageBg, color: c.text, fontFamily: 'var(--sans)', overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}>

      {/* BG blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-180px', right: '-180px', width: '600px', height: '600px', borderRadius: '50%', background: c.blobA }} />
        <div style={{ position: 'absolute', top: '50%', left: '-200px', width: '500px', height: '500px', borderRadius: '50%', background: c.blobB }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '15%', width: '400px', height: '400px', borderRadius: '50%', background: c.blobC }} />
      </div>

      {/* ── NAVBAR ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: '64px',
        background: c.navBg,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${c.navBorder}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: c.accentGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <CarIcon size={20} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 800, color: c.text, letterSpacing: '-0.5px' }}>
            Auto<span style={{ color: 'var(--cyan)' }}>Reach</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {[['Funciones', '#features'], ['Cómo funciona', '#how']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: '14px', color: c.navLinkColor, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = c.text)}
              onMouseLeave={e => (e.currentTarget.style.color = c.navLinkColor)}
            >{label}</a>
          ))}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '99px', border: `1px solid ${c.cardBorder}`,
              background: c.toggleBg, color: c.toggleColor, cursor: 'pointer',
              fontSize: '16px', transition: 'background 0.2s',
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '9px 20px', borderRadius: '99px', fontSize: '14px', fontWeight: 700,
            background: c.accentGrad,
            color: '#fff', textDecoration: 'none',
            boxShadow: `0 4px 16px ${c.accentShadow}`,
          }}>
            Acceder <ArrowIcon />
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '96px 24px 72px' }}>
        <div className="hero-anim" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(99,102,241,0.1))',
          border: '1px solid rgba(0,212,255,0.25)',
          borderRadius: '99px', padding: '7px 18px',
          fontSize: '13px', fontWeight: 700, color: 'var(--cyan)', marginBottom: '32px',
          animationDelay: '0ms',
        }}>
          Software para concesionarios
        </div>

        <h1 className="hero-anim" style={{ fontSize: 'clamp(42px, 6.5vw, 76px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2.5px', maxWidth: '860px', margin: '0 auto 24px', color: c.titleColor, animationDelay: '120ms' }}>
          Tu concesionario,{' '}
          <span style={{ color: 'var(--cyan)' }}>
            más inteligente
          </span>
        </h1>

        <p className="hero-anim" style={{ fontSize: '19px', color: c.textMuted, maxWidth: '580px', margin: '0 auto 48px', lineHeight: 1.7, animationDelay: '240ms' }}>
          Digitaliza la gestión de vehículos, documentación y firma de contratos. Tus clientes acceden a todo su historial desde cualquier sitio, en cualquier momento.
        </p>

        <div className="hero-anim" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px', animationDelay: '360ms' }}>
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '15px 36px', borderRadius: '14px', fontSize: '16px', fontWeight: 700,
            background: c.accentGrad,
            color: '#fff', textDecoration: 'none',
            boxShadow: `0 8px 32px ${c.accentShadow}`, transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${c.accentShadowHover}` }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${c.accentShadow}` }}
          >
            Acceder como cliente <ArrowIcon />
          </Link>
          <a
            href="https://raid-el-martinez.com/downloads/AutoReach.apk"
            download="AutoReach.apk"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '15px 36px', borderRadius: '14px', fontSize: '16px', fontWeight: 700,
              background: isDark ? 'rgba(0,212,255,0.08)' : 'rgba(0,118,168,0.07)',
              border: `1.5px solid ${isDark ? 'rgba(0,212,255,0.3)' : 'rgba(0,118,168,0.25)'}`,
              color: 'var(--cyan)', textDecoration: 'none', fontFamily: 'var(--sans)',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(0,212,255,0.14)' : 'rgba(0,118,168,0.13)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(0,212,255,0.08)' : 'rgba(0,118,168,0.07)' }}
          >
            <PhoneIcon size={18} /> Descargar App Android
          </a>
        </div>

      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ position: 'relative', zIndex: 1, padding: '80px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{
              display: 'inline-block', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '99px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, color: '#a5b4fc',
              letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px',
            }}>Todo lo que necesitas</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '14px', color: c.text }}>
              Una plataforma, <span style={{ color: 'var(--cyan)' }}>todo el control</span>
            </h2>
            <p style={{ fontSize: '16px', color: c.textMuted, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Centraliza la gestión de tu concesionario y ofrece a tus clientes una experiencia digital de primera.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {features.map(({ Icon, title, desc, href }) => {
              const cardStyle: CSSProperties = {
                background: c.cardBg,
                border: `1px solid ${c.cardBorder}`,
                borderRadius: '20px', padding: '28px',
                position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: href ? 'pointer' : 'default',
                textDecoration: 'none', color: 'inherit', display: 'block',
              }
              const inner = (
                <>
                  <div style={{ color: 'var(--cyan)', marginBottom: '16px' }}><Icon /></div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: c.text, marginBottom: '10px' }}>{title}</div>
                  <div style={{ fontSize: '14px', color: c.textMuted, lineHeight: 1.65 }}>{desc}</div>
                  {href && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: '99px', padding: '3px 10px', fontSize: '10px', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Descargar</div>
                  )}
                </>
              )
              const hoverIn = (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)' }
              const hoverOut = (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }
              return href ? (
                <a key={title} href={href} download="AutoReach.apk" style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{inner}</a>
              ) : (
                <div key={title} style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{inner}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ position: 'relative', zIndex: 1, padding: '80px 48px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: c.howBg, border: `1px solid ${c.howBorder}`, borderRadius: '28px', padding: '64px 48px', transition: 'background 0.3s' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Simple y rápido</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1px', color: c.text }}>¿Cómo funciona? Es fácil</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {steps.map(({ num, Icon, title, desc }, i) => (
              <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', top: '28px', left: '60%', right: '-40%', height: '2px', background: 'linear-gradient(90deg, rgba(0,212,255,0.4), rgba(0,212,255,0.05))', borderRadius: '99px' }} />
                )}
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: c.stepBg, border: `1px solid ${c.stepBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                  <Icon />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Paso {num}</div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: c.text, marginBottom: '10px' }}>{title}</div>
                <div style={{ fontSize: '14px', color: c.textMuted, lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 48px 100px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', background: c.ctaBg, border: `1px solid ${c.ctaBorder}`, borderRadius: '28px', padding: '64px 48px', transition: 'background 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--cyan)', marginBottom: '20px' }}>
            <RocketIcon />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px', color: c.text }}>¿Listo para empezar?</h2>
          <p style={{ fontSize: '16px', color: c.textMuted, marginBottom: '36px', lineHeight: 1.7 }}>
            Únete a los clientes que ya gestionan su vehículo de forma digital. Accede ahora y descubre lo fácil que es.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {perks.map(t => (
              <div key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: c.textMuted }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: c.perkCheck, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}><CheckIcon /></span>
                {t}
              </div>
            ))}
          </div>
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '15px 40px', borderRadius: '14px', fontSize: '16px', fontWeight: 700,
            background: c.accentGrad, color: '#fff', textDecoration: 'none',
            boxShadow: `0 8px 32px ${c.accentShadow}`, transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 40px ${c.accentShadowHover}` }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${c.accentShadow}` }}
          >
            Acceder ahora <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: `1px solid ${c.footerBorder}`, padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--cyan)' }}><CarIcon size={18} /></span>
          <span style={{ fontSize: '16px', fontWeight: 800, color: c.text }}>Auto<span style={{ color: 'var(--cyan)' }}>Reach</span></span>
          <span style={{ fontSize: '12px', color: c.textFaint }}>· Software para concesionarios</span>
        </div>
        <span style={{ fontSize: '12px', color: c.textFaint }}>© {new Date().getFullYear()} AutoReach · Todos los derechos reservados</span>
      </footer>
    </div>
  )
}
