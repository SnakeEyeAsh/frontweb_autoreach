import { supabase } from '../lib/supabase'
import type { coche, gestion, gestiones, documento } from '../model/Tipos'

const CLIENTE_ID = 1

export async function obtenerCliente(): Promise<{ nombre: string; apellidos: string }> {
  const { data, error } = await supabase
    .from('clientes')
    .select('nombre, apellidos')
    .eq('id', CLIENTE_ID)
    .single()
  if (error) throw error
  return data
}

export async function obtenerMatriculas(): Promise<string[]> {
  const { data, error } = await supabase
    .from('coches')
    .select('matricula')
  if (error) throw error
  return data.map((c: { matricula: string }) => c.matricula)
}

export async function obtenerCoche(matricula: string): Promise<coche> {
  const { data, error } = await supabase
    .from('coches')
    .select('matricula, kilometraje, modelos(nombre, marcas(nombre))')
    .eq('matricula', matricula)
    .single()
  if (error || !data) {
    return { marca: 'Desconocida', modelo: 'Desconocido', matricula, kilometros: 0 }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelo = data.modelos as any
  return {
    marca: modelo?.marcas?.nombre ?? 'Desconocida',
    modelo: modelo?.nombre ?? 'Desconocido',
    matricula: data.matricula,
    kilometros: data.kilometraje,
  }
}

export async function obtenerGestiones(): Promise<gestiones> {
  const { data, error } = await supabase
    .from('transacciones')
    .select('id, tipo_transaccion, fecha_transaccion, coches(matricula)')
    .eq('cliente_id', CLIENTE_ID)
  if (error) throw error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((t: any) => {
    const dt = new Date(t.fecha_transaccion)
    const fecha = dt.toISOString().split('T')[0]
    const hora = dt.toTimeString().slice(0, 5)
    return {
      id: t.id,
      tipo: t.tipo_transaccion,
      fecha,
      hora,
      matriculaRelacionada: t.coches?.matricula ?? '',
    }
  })
}

export async function agregarGestion(gestion: Omit<gestion, 'id'>) {
  const { data: cocheData, error: cocheError } = await supabase
    .from('coches')
    .select('vin')
    .eq('matricula', gestion.matriculaRelacionada)
    .single()
  if (cocheError) throw cocheError

  const fechaTransaccion = `${gestion.fecha}T${gestion.hora}:00`
  const { data, error } = await supabase
    .from('transacciones')
    .insert({
      tipo_transaccion: gestion.tipo,
      vin_coche: cocheData.vin,
      cliente_id: CLIENTE_ID,
      fecha_transaccion: fechaTransaccion,
      monto_total: 0,
    })
  if (error) throw error
  return data
}

export async function borrarGestion(id: number) {
  const { error } = await supabase
    .from('transacciones')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function modificarGestion(gestion: gestion) {
  const { data: cocheData, error: cocheError } = await supabase
    .from('coches')
    .select('vin')
    .eq('matricula', gestion.matriculaRelacionada)
    .single()
  if (cocheError) throw cocheError

  const fechaTransaccion = `${gestion.fecha}T${gestion.hora}:00`
  const { error } = await supabase
    .from('transacciones')
    .update({
      tipo_transaccion: gestion.tipo,
      vin_coche: cocheData.vin,
      fecha_transaccion: fechaTransaccion,
    })
    .eq('id', gestion.id)
  if (error) throw error
}

export async function obtenerDocumentos(): Promise<documento[]> {
  return []
}
