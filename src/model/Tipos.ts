export interface coche {
  marca: string
  modelo: string
  matricula: string
  kilometros: number
}

export interface gestion {
  id: number
  tipo: string
  fecha: string
  hora: string
  matriculaRelacionada: string
}

export type gestiones = gestion[]

export interface documento {
  id: number
  tipo_documento: string
  estado_documento: 'PENDIENTE_FIRMA' | 'FIRMADO' | 'CANCELADO'
  contenido?: string
  url_pdf?: string
  fecha_creacion: string
  fecha_firma?: string
  firmado_por?: string
  cliente_id: number
  transaccion_id?: number
}
