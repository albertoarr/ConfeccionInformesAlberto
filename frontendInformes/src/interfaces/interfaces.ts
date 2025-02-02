export interface Alumno {
  id: number;
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
  activo: boolean;
}

export interface AlumnoNuevo { // Para insertarlo en la BBDD (porque id es serial)
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
  activo: boolean;
}
