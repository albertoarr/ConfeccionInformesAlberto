import { useEffect, useState } from "react";
import { Alumno } from "../interfaces/interfaces";


export function getAlumnos(): { data: Alumno[] | undefined} {
    const [data,setData] = useState<Alumno[]|undefined>(undefined)

    const getJson = async () => {
        try {
            const response = await fetch("http://localhost:3002/api/alumnos")
            const jsonData = await response.json() 
            
            setData(jsonData)
            console.log(jsonData)
        } catch(error) {
            console.log("Error al llamar al Api", error)
        }
    }

    useEffect(() => {
        getJson()
    },[]) // Única petición 

    return { data }
}