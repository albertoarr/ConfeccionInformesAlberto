import { IonButton } from "@ionic/react";
import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetAlumnos } from "../hooks/useGetAlumnos";

export default function Alumn2PDF() {
  // Datos de los alumnos
  const { data: alumnos } = useGetAlumnos();

  const generarPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(12);
    doc.text("Lista de Alumnos", 20, 20);

    // Cabecera de la tabla
    const headers = [
      "ID",
      "Matrícula",
      "Nombre",
      "Sexo",
      "Email",
      "Repetidor",
      "Activo",
    ];

    // Filas de la tabla
    const rows = alumnos!.map((alumno) => [
      alumno.id.toString(),
      alumno.matricula,
      alumno.nombre,
      alumno.sexo,
      alumno.email,
      alumno.repetidor ? "Sí" : "No",
      alumno.activo ? "Sí" : "No",
    ]);

    // Agregar la tabla al PDF
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30, // La tabla comienza un poco después del título
    });

    // Guardar el PDF
    doc.save("alumnos.pdf");
  };

  return <IonButton onClick={generarPDF}>Generar PDF</IonButton>;
}
