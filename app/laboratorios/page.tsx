"use client";

import { useEffect, useState } from "react";
import styles from "./Laboratorios.module.css";
import Link from "next/link";

export default function Laboratorios() {
  const [laboratorios, setLaboratorios] = useState<
    {
      CodLab: number;
      razonSocial: string;
      direccion: string;
      telefono: string;
      email: string;
      contacto: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/laboratorios")
      .then((res) => res.json())
      .then((data) => setLaboratorios(data));
  }, []);

  const eliminarLaboratorio = async (id: number) => {
    if (confirm("¿Desea eliminar este laboratorio?")) {
      const res = await fetch(`/api/laboratorios/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLaboratorios((prev) => prev.filter((l) => l.CodLab !== id));
      } else {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Laboratorios</h1>
      <Link href="/laboratorios/new">Registrar nuevo laboratorio</Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* {laboratorios.map((lab: any) => ( */}
          {laboratorios.map((lab) => (
            <tr key={lab.CodLab}>
              <td>{lab.razonSocial}</td>
              <td>{lab.direccion}</td>
              <td>{lab.telefono}</td>
              <td>{lab.email}</td>
              <td>{lab.contacto}</td>
              <td>
                <Link href={`/laboratorios/edit/${lab.CodLab}`}>Editar</Link> |{" "}
                <button onClick={() => eliminarLaboratorio(lab.CodLab)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
