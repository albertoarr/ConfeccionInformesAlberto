import React from "react";
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

function AlumnChart() {
  const { data: alumnos = [] } = useGetAlumnos(); // Objeto alumnos como array para filtrar

  const countSex = (gender: string) =>
    alumnos.filter((alumno) => alumno.sexo === gender).length;

  const countRetake = (repite: boolean) =>
    alumnos.filter((alumno) => alumno.repetidor === repite).length;

  const sexData = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        label: "Cantidad de Alumnos",
        data: [countSex("M"), countSex("F")],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

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

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
      <Bar data={sexData} options={sexOptions} />
      <Bar data={retakeData} options={retakeOptions} />
    </div>
  );
}

export default AlumnChart;
