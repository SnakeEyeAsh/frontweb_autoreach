import type { coche, gestion, gestiones, documento } from '../model/Tipos'

const TOKEN_KEY = 'ar_token'
const API_URL = import.meta.env.VITE_API_URL as string

function getToken(): string {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) throw new Error('No autenticado')
  return token
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  })

  if (res.status === 401) {
    localStorage.removeItem(TOKEN_KEY)
    throw new Error('Sesión expirada, inicia sesión de nuevo')
  }
  if (res.status === 204) return undefined as T
  const body = await res.json()
  if (!res.ok) throw new Error(body.error ?? res.statusText)
  return body as T
}

// ─── Cliente ──────────────────────────────────────────────────────────────────

export async function obtenerCliente(): Promise<{ id: number; nombre: string; apellidos: string }> {
  return apiFetch('/api/me/cliente')
}

// ─── Matrículas ───────────────────────────────────────────────────────────────

export async function obtenerMatriculas(): Promise<string[]> {
  return apiFetch('/api/me/matriculas')
}

// ─── Coches ───────────────────────────────────────────────────────────────────

export async function obtenerCoche(matricula: string): Promise<coche> {
  return apiFetch(`/api/me/coches/${encodeURIComponent(matricula)}`)
}

// ─── Gestiones ────────────────────────────────────────────────────────────────

export async function obtenerGestiones(): Promise<gestiones> {
  return apiFetch('/api/me/gestiones')
}

export async function agregarGestion(gestion: Omit<gestion, 'id'>) {
  return apiFetch('/api/me/gestiones', {
    method: 'POST',
    body: JSON.stringify(gestion),
  })
}

export async function modificarGestion(gestion: gestion) {
  return apiFetch(`/api/me/gestiones/${gestion.id}`, {
    method: 'PUT',
    body: JSON.stringify(gestion),
  })
}

export async function borrarGestion(id: number) {
  return apiFetch(`/api/me/gestiones/${id}`, { method: 'DELETE' })
}

// ─── Imagen de perfil ─────────────────────────────────────────────────────────

export async function obtenerImagenPerfil(): Promise<Blob | null> {
  const token = getToken()
  const res = await fetch(`${API_URL}/api/me/imagen`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return null
  const buffer = await res.arrayBuffer()
  const b = new Uint8Array(buffer)
  let mime = 'image/jpeg'
  if (b[0] === 0x89 && b[1] === 0x50) mime = 'image/png'
  else if (b[0] === 0x47 && b[1] === 0x49) mime = 'image/gif'
  else if (b[0] === 0x52 && b[1] === 0x49) mime = 'image/webp'
  return new Blob([buffer], { type: mime })
}

export async function obtenerImagenCliente(id: number): Promise<Blob | null> {
  const res = await fetch(`${API_URL}/api/clientes/${id}/imagen`)
  if (!res.ok) return null
  const buffer = await res.arrayBuffer()
  const b = new Uint8Array(buffer)
  let mime = 'image/jpeg'
  if (b[0] === 0x89 && b[1] === 0x50) mime = 'image/png'
  else if (b[0] === 0x47 && b[1] === 0x49) mime = 'image/gif'
  else if (b[0] === 0x52 && b[1] === 0x49) mime = 'image/webp'
  return new Blob([buffer], { type: mime })
}

export async function subirImagenPerfil(id: number, file: File): Promise<void> {
  const token = getToken()
  const form = new FormData()
  form.append('imagen', file)
  const res = await fetch(`${API_URL}/api/clientes/${id}/imagen`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  if (!res.ok) throw new Error(`PUT falló: ${res.status}`)
}

// ─── Documentos ───────────────────────────────────────────────────────────────

export async function obtenerDocumentosCliente(clienteId: number): Promise<documento[]> {
  return apiFetch(`/api/documentos?cliente_id=${clienteId}`)
}

export async function firmarDocumento(id: number, firmadoPor: string): Promise<void> {
  return apiFetch(`/api/documentos/${id}/firmar`, {
    method: 'PUT',
    body: JSON.stringify({ firmado_por: firmadoPor }),
  })
}
