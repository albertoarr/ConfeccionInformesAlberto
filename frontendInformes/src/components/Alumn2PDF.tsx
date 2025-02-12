import { IonButton } from "@ionic/react";
import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetAlumnos } from "../hooks/useGetAlumnos";

export default function Alumn2PDF() {
  // Datos de los alumnos
  const { data: alumnos } = useGetAlumnos();

  const generarPDF = async () => {
    const doc = new jsPDF();

    /**
      Agregar imágenes al PDF desde la carpeta public.
      Me ahorro problemas señalando las imágenes como JPEG
      Ya que al no ser BASE64 el "Alpha" del formato no se 
      procesa con jsPDF de manera nativa
    */
    doc.addImage("/LogoGOBCAN.png", "JPEG", 20, 15, 30, 20);
    doc.addImage("/InfoIES.png", "JPEG", 80, 10, 50, 30);
    doc.addImage("/Logo IES.png", "JPEG", 150, 15, 40, 20);

    // Título
    doc.setFontSize(18);
    doc.text("Lista de Alumnos", 20, 60);

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
      startY: 70, // La tabla comienza después de las imágenes y título
    });

    // Guardar el PDF
    doc.save("alumnos.pdf");
  };

  return <IonButton onClick={generarPDF}>Generar PDF</IonButton>;
}
