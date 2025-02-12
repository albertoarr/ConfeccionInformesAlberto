import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAlumnos } from "../hooks/useGetAlumnos";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AlumnCharts() {
  const { data: alumnos = [] } = useGetAlumnos(); // Objeto alumnos como array para filtrar

  // Cuenta de alumnos de sexo específico
  const countSex = (gender: string) =>
    alumnos.filter((alumno) => alumno.sexo === gender).length;
  // Cuenta de repetidores
  const countRetake = (repite: boolean) =>
    alumnos.filter((alumno) => alumno.repetidor === repite).length;

  // Datos y opciones de sexos para el chart
  const sexData = {
    labels: ["Hombre", "Mujer"],
    datasets: [
      {
        label: "Cantidad de Alumnos",
        data: [countSex("M"), countSex("F")],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const sexOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Distribución de Alumnos por Género",
      },
    },
  };

  // Datos y opciones de repetidores para el chart
  const retakeData = {
    labels: ["Primer Año", "Repetidor"],
    datasets: [
      {
        label: "Cantidad de Alumnos",
        data: [countRetake(false), countRetake(true)],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const retakeOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Primer Año y Repetidores",
      },
    },
  };

  // Genera un div con las dos tablas (una al lado de otra)
  return (
    <div
      id="graficos" // Id para recuperar imagen
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "100px",
      }}
    >
      <div style={{ width: "100%" }}>
        <Bar data={sexData} options={sexOptions} />
      </div>
      <div style={{ width: "100%" }}>
        <Bar data={retakeData} options={retakeOptions} />
      </div>
    </div>
  );
}
