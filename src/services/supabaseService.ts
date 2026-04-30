import { supabase } from '../lib/supabase'
import type { coche, gestion, gestiones, documento } from '../model/Tipos'

const API_URL = import.meta.env.VITE_API_URL as string

async function getToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) return session.access_token

  // Si no hay sesión en caché, intenta refrescar
  const { data: { session: refreshed } } = await supabase.auth.refreshSession()
  if (!refreshed) throw new Error('No autenticado')
  return refreshed.access_token
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const doRequest = async (token: string) =>
    fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    })

  let token = await getToken()
  let res = await doRequest(token)

  // Token caducado: refresca y reintenta una vez
  if (res.status === 401) {
    const { data: { session } } = await supabase.auth.refreshSession()
    if (!session) throw new Error('Sesión expirada, inicia sesión de nuevo')
    token = session.access_token
    res = await doRequest(token)
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
  const token = await getToken()
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
  const form = new FormData()
  form.append('imagen', file)
  const res = await fetch(`${API_URL}/api/clientes/${id}/imagen`, {
    method: 'PUT',
    body: form,
  })
  if (!res.ok) throw new Error(`PUT falló: ${res.status}`)
}

// ─── Documentos ───────────────────────────────────────────────────────────────

export async function obtenerDocumentos(): Promise<documento[]> {
  return apiFetch('/api/me/documentos')
}
