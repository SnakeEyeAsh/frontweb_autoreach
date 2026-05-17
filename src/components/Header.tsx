import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function HomeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
    </svg>
  )
}


function DocIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
  )
}

const links = [
  { to: '/dashboard', label: 'Inicio', Icon: HomeIcon },
  { to: '/gestiones', label: 'Gestiones', Icon: ListIcon },
  { to: '/docs', label: 'Documentos', Icon: DocIcon },
]

export default function Header() {
  const { signOut } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-name">Auto<span style={{ color: '#fff', fontWeight: 300 }}>Reach</span></div>
        <div className="brand-sub">La plataforma del concesionario moderno</div>
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer del sidebar: usuario + logout */}
      <div style={{
        marginTop: 'auto',
        padding: '16px 12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            style={{ flex: 1, borderRadius: '10px', fontSize: '13px', gap: '8px', padding: '0 12px', width: '100%', height: '36px' }}
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
            <span style={{ fontSize: '13px', fontWeight: 500 }}>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-link"
          style={{
            width: '100%', background: 'none', border: 'none',
            cursor: 'pointer', textAlign: 'left',
          }}
        >
          <LogoutIcon />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
