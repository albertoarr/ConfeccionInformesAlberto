export interface Alumno {
  id: number;
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
  activo: boolean;
}

export interface AlumnoNuevo {
  // Para usar CREATE (no sé usar Omit)
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
  activo: boolean;
}
