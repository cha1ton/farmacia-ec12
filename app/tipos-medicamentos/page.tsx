'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './TiposMedic.module.css'

export default function TiposMedicamentos() {
  const [tipos, setTipos] = useState([])

  useEffect(() => {
    fetch('/api/tipos-medicamentos')
      .then(res => res.json())
      .then(setTipos)
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Tipos de Medicamentos</h1>
      <Link href="/tipos-medicamentos/new" className={styles.link}>
        Registrar nuevo tipo
      </Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo: any) => (
            <tr key={tipo.CodTipoMed}>
              <td>{tipo.CodTipoMed}</td>
              <td>{tipo.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
