import { useEffect, useState } from 'react'
import { obtenerGestiones, obtenerMatriculas, borrarGestion, modificarGestion } from '../services/supabaseService'
import type { gestion, gestiones } from '../model/Tipos'

export default function Gestiones() {
  const [gestiones, setGestiones] = useState<gestiones>([])
  const [matriculas, setMatriculas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editando, setEditando] = useState<gestion | null>(null)
  const [guardando, setGuardando] = useState(false)

  async function cargar() {
    try {
      const [gs, mats] = await Promise.all([obtenerGestiones(), obtenerMatriculas()])
      setGestiones(gs)
      setMatriculas(mats)
    } catch {
      setError('Error al cargar gestiones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  async function handleBorrar(id: number) {
    if (!confirm('¿Seguro que quieres eliminar esta gestión?')) return
    try {
      await borrarGestion(id)
      setGestiones(prev => prev.filter(g => g.id !== id))
    } catch {
      setError('Error al eliminar')
    }
  }

  async function handleGuardar() {
    if (!editando) return
    setGuardando(true)
    try {
      await modificarGestion(editando)
      setGestiones(prev => prev.map(g => g.id === editando.id ? editando : g))
      setEditando(null)
    } catch {
      setError('Error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>Cargando...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Gestiones</h1>
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {gestiones.length} {gestiones.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {gestiones.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '48px' }}>
          No hay gestiones registradas
        </div>
      ) : (
        <div>
          {/* Cabecera de columnas */}
          <div className="list-header gestiones-cols">
            <span>Tipo</span>
            <span>Fecha</span>
            <span>Hora</span>
            <span>Matrícula</span>
            <span />
          </div>

          {gestiones.map(g => (
            <div key={g.id}>
              {editando?.id === g.id ? (
                <div className="card" style={{ marginBottom: '8px' }}>
                  <EditForm
                    gestion={editando}
                    matriculas={matriculas}
                    onChange={setEditando}
                    onGuardar={handleGuardar}
                    onCancelar={() => setEditando(null)}
                    guardando={guardando}
                  />
                </div>
              ) : (
                <div className="list-row gestiones-cols">
                  <span style={{ fontWeight: 600, fontSize: '15px' }}>{g.tipo}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{g.fecha}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{g.hora}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{g.matriculaRelacionada}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '13px' }} onClick={() => setEditando({ ...g })}>
                      Editar
                    </button>
                    <button className="btn btn-danger" style={{ padding: '6px 14px', fontSize: '13px' }} onClick={() => handleBorrar(g.id)}>
                      Borrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EditForm({ gestion, matriculas, onChange, onGuardar, onCancelar, guardando }: {
  gestion: gestion
  matriculas: string[]
  onChange: (g: gestion) => void
  onGuardar: () => void
  onCancelar: () => void
  guardando: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px' }}>
        <div>
          <label>Tipo</label>
          <input
            value={gestion.tipo}
            onChange={e => onChange({ ...gestion, tipo: e.target.value })}
          />
        </div>
        <div>
          <label>Fecha</label>
          <input
            type="date"
            value={gestion.fecha}
            onChange={e => onChange({ ...gestion, fecha: e.target.value })}
          />
        </div>
        <div>
          <label>Hora</label>
          <input
            type="time"
            value={gestion.hora}
            onChange={e => onChange({ ...gestion, hora: e.target.value })}
          />
        </div>
        <div>
          <label>Matrícula</label>
          <select
            value={gestion.matriculaRelacionada}
            onChange={e => onChange({ ...gestion, matriculaRelacionada: e.target.value })}
          >
            {matriculas.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button className="btn btn-ghost" onClick={onCancelar}>Cancelar</button>
        <button className="btn btn-primary" onClick={onGuardar} disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  )
}
