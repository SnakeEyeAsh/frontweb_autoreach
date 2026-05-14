import { useEffect, useRef, useState, useCallback } from 'react'
import { obtenerCliente, obtenerDocumentosCliente, firmarDocumento } from '../services/supabaseService'
import type { documento } from '../model/Tipos'

const TIPO_LABEL: Record<string, string> = {
  CONTRATO_COMPRAVENTA: 'Contrato de compraventa',
  GARANTIA: 'Garantía',
  FACTURA: 'Factura',
  PERMISO_CIRCULACION: 'Permiso de circulación',
  SEGURO: 'Seguro',
  ITV: 'ITV',
  OTRO: 'Otro',
}

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDIENTE_FIRMA: { label: 'Pendiente de firma', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  FIRMADO:         { label: 'Firmado',             color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  CANCELADO:       { label: 'Cancelado',            color: 'var(--danger)', bg: 'rgba(229,57,53,0.1)' },
}

function tipoLabel(tipo: string) {
  return TIPO_LABEL[tipo] ?? tipo.replace(/_/g, ' ')
}

/* ── Signature canvas modal ── */
interface SignModalProps {
  doc: documento
  firmadoPor: string
  onClose: () => void
  onSigned: (id: number) => void
}

function SignModal({ doc, firmadoPor, onClose, onSigned }: SignModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  function getXY(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const src = 'touches' in e ? e.touches[0] : e
    return { x: src.clientX - rect.left, y: src.clientY - rect.top }
  }

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getXY(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    lastPos.current = pos
    setIsDrawing(true)
    setHasDrawn(true)
  }, [])

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !lastPos.current) return
    const pos = getXY(e)
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#1e2535'
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    lastPos.current = pos
  }, [isDrawing])

  const stopDraw = useCallback(() => {
    setIsDrawing(false)
    lastPos.current = null
  }, [])

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  async function handleConfirm() {
    if (!hasDrawn) return
    setSaving(true)
    setError('')
    try {
      await firmarDocumento(doc.id, firmadoPor)
      onSigned(doc.id)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al firmar')
      setSaving(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--card-bg)', borderRadius: '20px',
        padding: '32px', width: '100%', maxWidth: '520px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
              Firmar documento
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {tipoLabel(doc.tipo_documento)}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: '32px', height: '32px', borderRadius: '8px', border: 'none',
            background: 'var(--bg)', color: 'var(--text-secondary)',
            cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Dibuja tu firma en el recuadro. Al confirmar el documento quedará firmado por <strong style={{ color: 'var(--text)' }}>{firmadoPor}</strong> y la transacción vinculada pasará a estado <strong style={{ color: '#10b981' }}>Pagada</strong>.
        </div>

        {/* Canvas */}
        <div style={{
          border: '2px dashed var(--border)', borderRadius: '12px',
          background: '#fff', overflow: 'hidden', marginBottom: '16px',
          cursor: 'crosshair', userSelect: 'none',
        }}>
          <canvas
            ref={canvasRef}
            width={456}
            height={180}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            style={{ display: 'block', width: '100%', height: '180px', touchAction: 'none' }}
          />
        </div>

        {!hasDrawn && (
          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            ✍️ Dibuja tu firma aquí arriba
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.3)',
            color: 'var(--danger)', borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', marginBottom: '16px',
          }}>{error}</div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={clearCanvas}
            disabled={!hasDrawn}
            className="btn btn-ghost"
            style={{ flex: 1 }}
          >
            Limpiar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!hasDrawn || saving}
            className="btn btn-primary"
            style={{ flex: 2 }}
          >
            {saving ? 'Firmando...' : 'Confirmar firma ✅'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main page ── */
export default function Docs() {
  const [docs, setDocs] = useState<documento[]>([])
  const [clienteNombre, setClienteNombre] = useState('')
  const [clienteId, setClienteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [signing, setSigning] = useState<documento | null>(null)

  useEffect(() => {
    obtenerCliente()
      .then(async cli => {
        setClienteNombre(`${cli.nombre} ${cli.apellidos}`)
        setClienteId(cli.id)
        const data = await obtenerDocumentosCliente(cli.id)
        setDocs(data)
      })
      .catch(e => setError(e?.message ?? 'Error al cargar documentos'))
      .finally(() => setLoading(false))
  }, [])

  function handleSigned(id: number) {
    setDocs(prev => prev.map(d =>
      d.id === id ? { ...d, estado_documento: 'FIRMADO', fecha_firma: new Date().toISOString(), firmado_por: clienteNombre } : d
    ))
    setSigning(null)
  }

  const pendientes = docs.filter(d => d.estado_documento === 'PENDIENTE_FIRMA')
  const resto = docs.filter(d => d.estado_documento !== 'PENDIENTE_FIRMA')

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Cargando documentos...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Documentos</h1>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          {docs.length} documento{docs.length !== 1 ? 's' : ''}
          {pendientes.length > 0 && (
            <span style={{
              marginLeft: '10px', background: 'rgba(245,158,11,0.15)',
              color: '#f59e0b', borderRadius: '99px', padding: '2px 10px',
              fontSize: '12px', fontWeight: 700,
            }}>
              {pendientes.length} pendiente{pendientes.length !== 1 ? 's' : ''} de firma
            </span>
          )}
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {docs.length === 0 && !error && (
        <div className="card" style={{ padding: '48px 32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '40px' }}>📄</div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Sin documentos</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              No hay documentos asociados a tu cuenta todavía.
            </div>
          </div>
        </div>
      )}

      {/* Pendientes primero */}
      {pendientes.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Requieren tu firma
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendientes.map(doc => (
              <DocRow key={doc.id} doc={doc} onSign={() => setSigning(doc)} />
            ))}
          </div>
        </div>
      )}

      {/* Resto */}
      {resto.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Historial
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resto.map(doc => (
              <DocRow key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      )}

      {signing && clienteId !== null && (
        <SignModal
          doc={signing}
          firmadoPor={clienteNombre}
          onClose={() => setSigning(null)}
          onSigned={handleSigned}
        />
      )}
    </div>
  )
}

/* ── Doc row ── */
function DocRow({ doc, onSign }: { doc: documento; onSign?: () => void }) {
  const estado = ESTADO_CONFIG[doc.estado_documento] ?? ESTADO_CONFIG.CANCELADO

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '16px', background: 'var(--card-bg)', borderRadius: 'var(--radius)',
      padding: '16px 20px', boxShadow: 'var(--shadow)',
      borderLeft: doc.estado_documento === 'PENDIENTE_FIRMA' ? '3px solid #f59e0b' : '3px solid transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
        <div style={{ fontSize: '28px', flexShrink: 0 }}>
          {doc.estado_documento === 'FIRMADO' ? '✅' : doc.estado_documento === 'CANCELADO' ? '❌' : '📋'}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '3px' }}>
            {tipoLabel(doc.tipo_documento)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Creado el {new Date(doc.fecha_creacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
            {doc.fecha_firma && ` · Firmado el ${new Date(doc.fecha_firma).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}`}
            {doc.firmado_por && ` por ${doc.firmado_por}`}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <span style={{
          fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px',
          color: estado.color, background: estado.bg,
        }}>
          {estado.label}
        </span>
        {onSign && (
          <button onClick={onSign} className="btn btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>
            ✍️ Firmar
          </button>
        )}
      </div>
    </div>
  )
}
