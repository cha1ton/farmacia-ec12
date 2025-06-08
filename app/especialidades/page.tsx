'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Especialidades.module.css'

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([])

  useEffect(() => {
    fetch('/api/especialidades')
      .then(res => res.json())
      .then(setEspecialidades)
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Especialidades</h1>
      <Link href="/especialidades/new" className={styles.link}>
        Registrar nueva especialidad
      </Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((esp: any) => (
            <tr key={esp.CodEspec}>
              <td>{esp.CodEspec}</td>
              <td>{esp.descripcionEsp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
