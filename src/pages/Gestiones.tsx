import { useEffect, useState } from 'react'
import { obtenerGestiones, obtenerMatriculas, borrarGestion } from '../services/supabaseService'
import type { gestiones } from '../model/Tipos'

export default function Gestiones() {
  const [gestiones, setGestiones] = useState<gestiones>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function cargar() {
    try {
      const [gs] = await Promise.all([obtenerGestiones(), obtenerMatriculas()])
      setGestiones(gs)
    } catch {
      setError('Error al cargar gestiones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  async function handleDeshacer(id: number) {
    if (!confirm('¿Seguro que deseas deshacer esta transacción?')) return
    try {
      await borrarGestion(id)
      setGestiones(prev => prev.filter(g => g.id !== id))
      alert('Diríjase a su concesionario para acordar los términos de la cancelación.')
    } catch {
      setError('Error al deshacer la transacción')
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
          <div className="list-header gestiones-cols">
            <span>Tipo</span>
            <span>Fecha</span>
            <span>Hora</span>
            <span>Matrícula</span>
            <span />
          </div>

          {gestiones.map(g => (
            <div key={g.id} className="list-row gestiones-cols">
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{g.tipo}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{g.fecha}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{g.hora}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{g.matriculaRelacionada}</span>
              <div>
                <button className="btn btn-danger" style={{ padding: '6px 14px', fontSize: '13px' }} onClick={() => handleDeshacer(g.id)}>
                  Deshacer transacción
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
