import { IonButton } from "@ionic/react";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Alumn2PDF() {
  const { data: alumnos } = useGetAlumnos();
  // Recogemos ID del div de gráficos
  const graficos = document.getElementById("graficos");

  const generarPDF = async () => {
    const doc = new jsPDF();

    // Agregar imágenes al PDF desde la carpeta public.
    // Poniendo formato JPEG ahorro problemas de formato PNG.
    doc.addImage("/LogoGOBCAN.png", "JPEG", 20, 15, 35, 20);
    doc.addImage("/InfoIES.png", "JPEG", 75, 10, 55, 30);
    doc.addImage("/Logo IES.png", "JPEG", 145, 15, 50, 20);

    // Graficos
    if (graficos) {
      const graficosCanvas = await html2canvas(graficos);
      const graficosToImg = graficosCanvas.toDataURL("image/jpeg");
      doc.addImage(graficosToImg, "JPEG", 20, 50, 180, 50);
    }

    // Título
    doc.setFontSize(18);
    doc.text("Lista de Alumnos", 20, 110);

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
      startY: 120, // La tabla empieza después de las imágenes y título
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
