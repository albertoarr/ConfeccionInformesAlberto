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

    // Agregar imágenes al PDF desde la carpeta public.
    // Poniendo formato JPEG ahorro problemas de formato PNG.
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

    // Dibujo de la tabla
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 70, // La tabla empieza después de las imágenes y título
    });

    // Número de página
    const totalPages = doc.internal.getNumberOfPages(); // Error falso
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${totalPages}`, 90, 285);
    }

    // Guardar el PDF
    doc.save("alumnos.pdf");
  };

  return <IonButton onClick={generarPDF}>Generar PDF</IonButton>;
}
