'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Medicamentos.module.css'

export default function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([])

  useEffect(() => {
    fetch('/api/medicamentos')
      .then(res => res.json())
      .then(setMedicamentos)
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Listado de Medicamentos</h1>
      <Link href="/medicamentos/new" className={styles.link}>
        Registrar nuevo medicamento
      </Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Marca</th>
            <th>Presentación</th>
            <th>Precio Unitario</th>
            <th>Stock</th>
            <th>Especialidad</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med: any) => (
            <tr key={med.CodMedicamento}>
              <td>{med.descripcionMed}</td>
              <td>{med.Marca}</td>
              <td>{med.presentacion}</td>
              <td>{med.precioVentaUni}</td>
              <td>{med.stock}</td>
              <td>{med.especialidad?.descripcionEsp}</td>
              <td>{med.tipoMedic?.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
