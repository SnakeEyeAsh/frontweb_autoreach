import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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

function CalendarPlusIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 12h-3v3h-2v-3h-3v-2h3V7h2v3h3v2zm2-9h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
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
  { to: '/', label: 'Inicio', Icon: HomeIcon },
  { to: '/gestiones', label: 'Gestiones', Icon: ListIcon },
  { to: '/nueva-cita', label: 'Nueva Cita', Icon: CalendarPlusIcon },
  { to: '/docs', label: 'Documentos', Icon: DocIcon },
]

export default function Header() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-name">AutoReach</div>
        <div className="brand-sub">Gestión de tu vehículo</div>
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
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
        {session?.user?.email && (
          <div style={{
            padding: '8px 12px',
            marginBottom: '6px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {session.user.email}
          </div>
        )}
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
