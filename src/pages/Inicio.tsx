import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerCliente, obtenerMatriculas, obtenerCoche, obtenerGestiones, obtenerImagenCliente, subirImagenPerfil } from '../services/supabaseService'
import type { coche, gestion } from '../model/Tipos'

const TODAY = new Date().toISOString().split('T')[0]

export default function Inicio() {
  const [cliente, setCliente] = useState<{ id: number; nombre: string; apellidos: string } | null>(null)
  const [matriculas, setMatriculas] = useState<string[]>([])
  const [matriculaActiva, setMatriculaActiva] = useState('')
  const [cocheInfo, setCocheInfo] = useState<coche | null>(null)
  const [gestiones, setGestiones] = useState<gestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [imgError, setImgError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!cliente?.id) {
      setError('No se puede subir la imagen: el backend no devuelve el id del cliente en GET /api/me/cliente')
      return
    }

    setUploading(true)
    try {
      await subirImagenPerfil(cliente.id, file)
      setImgSrc(URL.createObjectURL(file))
      setImgError(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al subir la imagen')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  useEffect(() => {
    let blobUrl: string | null = null

    Promise.all([obtenerCliente(), obtenerMatriculas(), obtenerGestiones()])
      .then(async ([cli, mats, gs]) => {
        setCliente(cli)
        setMatriculas(mats)
        setGestiones(gs)
        if (mats.length > 0) {
          setMatriculaActiva(mats[0])
          const coche = await obtenerCoche(mats[0])
          setCocheInfo(coche)
        }
        const blob = await obtenerImagenCliente(cli.id)
        if (blob) {
          blobUrl = URL.createObjectURL(blob)
          setImgSrc(blobUrl)
        } else {
          setImgError(true)
        }
      })
      .catch((e) => setError(e?.message ?? JSON.stringify(e)))
      .finally(() => setLoading(false))

    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl) }
  }, [])

  async function cambiarMatricula(mat: string) {
    if (mat === matriculaActiva) return
    setMatriculaActiva(mat)
    setCocheInfo(null)
    try {
      const coche = await obtenerCoche(mat)
      setCocheInfo(coche)
    } catch {
      setError('Error al cargar el vehículo')
    }
  }

  const proximaCita = gestiones
    .filter(g => g.fecha >= TODAY)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0]

  const ultimasGestiones = [...gestiones]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 6)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Cargando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="page">
      {/* Cabecera */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>
          Bienvenido{cliente ? `, ${cliente.nombre}` : ''}
        </h1>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Vehículos registrados</div>
          <div className="stat-value cyan">{matriculas.length}</div>
          <div className="stat-sub">{matriculas.join(', ') || '—'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total gestiones</div>
          <div className="stat-value">{gestiones.length}</div>
          <div className="stat-sub">historial completo</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Próxima cita</div>
          {proximaCita ? (
            <>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--cyan)', marginTop: '4px' }}>
                {proximaCita.fecha}
              </div>
              <div className="stat-sub">{proximaCita.tipo} · {proximaCita.hora}</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>
                Sin citas
              </div>
              <div className="stat-sub">
                <Link to="/nueva-cita" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600 }}>
                  Programar cita →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Grid principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px', marginBottom: '20px' }}>

        {/* Perfil */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', overflow: 'hidden' }}>
          <div style={{ background: 'var(--navy)', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              title="Cambiar foto de perfil"
              style={{
                position: 'relative', width: '72px', height: '72px', borderRadius: '50%',
                background: '#1565c0', border: '3px solid var(--cyan)',
                overflow: 'hidden', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: uploading ? 'wait' : 'pointer',
              }}
            >
              {imgSrc && !imgError ? (
                <img
                  src={imgSrc}
                  alt="Foto de perfil"
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              )}
              {/* Overlay hover */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: uploading ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => { if (!uploading) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
                onMouseLeave={e => { if (!uploading) (e.currentTarget as HTMLDivElement).style.opacity = '0' }}
              >
                {uploading ? (
                  <div style={{
                    width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zm6.5-10.7H17l-1.2-1.9A1 1 0 0 0 15 2H9a1 1 0 0 0-.84.46L6.96 4.5H5.5A3.5 3.5 0 0 0 2 8v9a3.5 3.5 0 0 0 3.5 3.5h13A3.5 3.5 0 0 0 22 17V8a3.5 3.5 0 0 0-3.5-3.5z"/>
                  </svg>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            {cliente && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{cliente.nombre}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{cliente.apellidos}</div>
              </div>
            )}
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Vehículos
            </div>
            {matriculas.map(m => (
              <button
                key={m}
                onClick={() => cambiarMatricula(m)}
                style={{
                  width: '100%', textAlign: 'left', cursor: 'pointer',
                  padding: '8px 12px', borderRadius: '7px', border: 'none',
                  marginBottom: '4px', fontSize: '14px', fontWeight: 600,
                  background: m === matriculaActiva ? 'var(--cyan-light)' : 'var(--bg)',
                  color: m === matriculaActiva ? '#006064' : 'var(--text)',
                  transition: 'background 0.15s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: m === matriculaActiva ? 'var(--cyan)' : 'var(--border)',
                  flexShrink: 0,
                }} />
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Vehículo */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ marginBottom: '2px' }}>Información del vehículo</h2>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {matriculaActiva || 'Sin matrícula seleccionada'}
              </div>
            </div>
          </div>
          {cocheInfo ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <VehicleField label="Marca" value={cocheInfo.marca} />
                <VehicleField label="Modelo" value={cocheInfo.modelo} />
                <VehicleField label="Matrícula" value={cocheInfo.matricula} />
                <VehicleField label="Kilometraje" value={`${cocheInfo.kilometros.toLocaleString()} km`} highlight />
              </div>
              {/* Progress bar decorativa de km */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Estado del odómetro
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>
                    {cocheInfo.kilometros.toLocaleString()} km
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '99px',
                    background: 'var(--cyan)',
                    width: `${Math.min(100, (cocheInfo.kilometros / 200000) * 100)}%`,
                    transition: 'width 0.5s',
                  }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  De 200.000 km de referencia
                </div>
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', padding: '20px 0' }}>
              Cargando información del vehículo...
            </div>
          )}
        </div>
      </div>

      {/* Últimas gestiones */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
        }}>
          <h2 style={{ marginBottom: 0 }}>Últimas gestiones</h2>
          <Link to="/gestiones" style={{ fontSize: '13px', color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600 }}>
            Ver todas →
          </Link>
        </div>
        {ultimasGestiones.length === 0 ? (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
            No hay gestiones. <Link to="/nueva-cita" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600 }}>Crear primera cita →</Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg)' }}>
                {['Tipo', 'Fecha', 'Hora', 'Matrícula'].map(h => (
                  <th key={h} style={{
                    padding: '9px 20px', textAlign: 'left',
                    fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.6px', color: 'var(--text-secondary)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ultimasGestiones.map((g, i) => (
                <tr
                  key={g.id}
                  style={{
                    borderTop: '1px solid var(--border)',
                    background: i % 2 === 0 ? '#fff' : '#fafbfc',
                  }}
                >
                  <td style={{ padding: '11px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                    {g.tipo}
                  </td>
                  <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {g.fecha}
                  </td>
                  <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {g.hora}
                  </td>
                  <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {g.matriculaRelacionada}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function VehicleField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ background: 'var(--bg)', padding: '14px 16px', borderRadius: '8px' }}>
      <div className="field-label">{label}</div>
      <div style={{ fontSize: '16px', fontWeight: 700, color: highlight ? 'var(--cyan)' : 'var(--text)', marginTop: '2px' }}>
        {value}
      </div>
    </div>
  )
}
