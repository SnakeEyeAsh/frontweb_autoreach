import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerMatriculas, agregarGestion } from '../services/supabaseService'

const TIPOS = [
  'Revisión',
  'Cambio de aceite',
  'Cambio de ruedas',
  'ITV',
  'Reparación',
  'Compra',
  'Venta',
  'Otro',
]

export default function NuevaCita() {
  const navigate = useNavigate()
  const [matriculas, setMatriculas] = useState<string[]>([])
  const [form, setForm] = useState({
    tipo: TIPOS[0],
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    matriculaRelacionada: '',
  })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerMatriculas()
      .then(mats => {
        setMatriculas(mats)
        if (mats.length > 0) setForm(f => ({ ...f, matriculaRelacionada: mats[0] }))
      })
      .catch(() => setError('Error al cargar matrículas'))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.matriculaRelacionada) return
    setGuardando(true)
    setError('')
    try {
      await agregarGestion(form)
      navigate('/gestiones')
    } catch {
      setError('Error al guardar la cita')
      setGuardando(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Nueva Cita</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div style={{ maxWidth: '600px' }}>
        <form className="card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label>Tipo de gestión</label>
            <select
              value={form.tipo}
              onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
            >
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label>Fecha</label>
              <input
                type="date"
                value={form.fecha}
                onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                required
              />
            </div>
            <div>
              <label>Hora</label>
              <input
                type="time"
                value={form.hora}
                onChange={e => setForm(f => ({ ...f, hora: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <label>Matrícula</label>
            <select
              value={form.matriculaRelacionada}
              onChange={e => setForm(f => ({ ...f, matriculaRelacionada: e.target.value }))}
            >
              {matriculas.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '4px' }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate('/gestiones')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={guardando || !form.matriculaRelacionada}
            >
              {guardando ? 'Guardando...' : 'Guardar Cita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
