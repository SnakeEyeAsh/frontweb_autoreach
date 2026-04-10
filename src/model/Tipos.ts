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
  nombre: string
  firmado: boolean
}
