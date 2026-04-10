import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/gestiones', label: 'Gestiones', icon: '📋' },
  { to: '/nueva-cita', label: 'Nueva Cita', icon: '➕' },
  { to: '/docs', label: 'Docs', icon: '📄' },
]

export default function NavBar() {
  return (
    <nav style={{
      background: 'var(--navy)',
      display: 'flex',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '12px 8px',
            textDecoration: 'none',
            color: isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.5)',
            borderBottom: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
            fontSize: '12px',
            fontWeight: isActive ? '700' : '400',
            transition: 'color 0.2s',
          })}
        >
          <span style={{ fontSize: '18px' }}>{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
