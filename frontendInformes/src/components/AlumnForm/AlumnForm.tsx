import React, { useState } from "react";
import { useInsertAlumno } from "../../hooks/useInsertAlumno";

interface Student {
  id: number;
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
  activo: boolean;
}

interface NewStudent {
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
  activo: boolean;
}

export default function AlumnForm() {
  const [newStudent, setNewStudent] = useState<NewStudent>({
    matricula: "",
    nombre: "",
    sexo: "",
    email: "",
    repetidor: false,
    activo: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Aquí hacemos un type narrowing para asegurarnos que 'checked' solo se use con checkbox
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement; // Type assertion para que TypeScript sepa que es un checkbox
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: checked,
      }));
    } else {
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useInsertAlumno(newStudent);
    setNewStudent({
      matricula: "",
      nombre: "",
      sexo: "",
      email: "",
      repetidor: false,
      activo: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register New Student
      </h2>

      <input
        type="text"
        name="matricula"
        value={newStudent.matricula}
        onChange={handleChange}
        placeholder="Registration Number"
        className="w-full p-2 border rounded mb-2"
        required
      />

      <input
        type="text"
        name="nombre"
        value={newStudent.nombre}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
        required
      />

      <select
        name="sexo"
        value={newStudent.sexo}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
        required
      >
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

      <input
        type="email"
        name="email"
        value={newStudent.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        required
      />

      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="repetidor"
          checked={newStudent.repetidor}
          onChange={handleChange}
          className="mr-2"
        />
        Is Repeater?
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Register Student
      </button>
    </form>
  );
}
