'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './OrdenesVenta.module.css'
import { useRouter } from 'next/navigation'

type Detalle = {
  descripcionMed: string
  cantidadRequerida: number
}

type OrdenVenta = {
  NroOrdenVta: number
  fechaEmision: string
  Motivo: string
  Situacion: string
  detalles: Detalle[]
}

export default function OrdenesVenta() {
  const [ordenes, setOrdenes] = useState<OrdenVenta[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/ordenes-venta')
      .then(res => res.json())
      .then(data => setOrdenes(data))
  }, [])

  const eliminarOrden = async (id: number) => {
    if (confirm('¿Desea eliminar esta orden de venta?')) {
      const res = await fetch(`/api/ordenes-venta/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setOrdenes(prev => prev.filter(o => o.NroOrdenVta !== id))
      } else {
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Órdenes de Venta</h1>
      <Link href="/ordenes-venta/new">Registrar nueva orden</Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Fecha</th>
            <th>Motivo</th>
            <th>Situación</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.NroOrdenVta}>
              <td>{orden.NroOrdenVta}</td>
              <td>{new Date(orden.fechaEmision).toLocaleDateString()}</td>
              <td>{orden.Motivo}</td>
              <td>{orden.Situacion}</td>
              <td>
                <ul className={styles.listaDetalles}>
                  {orden.detalles.map((d, i) => (
                    <li key={i}>
                      {d.descripcionMed} — {d.cantidadRequerida}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <Link href={`/ordenes-venta/edit/${orden.NroOrdenVta}`}>Editar</Link>
                {' | '}
                <button onClick={() => eliminarOrden(orden.NroOrdenVta)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
