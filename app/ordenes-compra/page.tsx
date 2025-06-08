//app/ordenes-compra/page.tsx

"use client";

import { useEffect, useState } from "react";
import styles from "./OrdenesCompra.module.css";
import Link from "next/link";

interface OrdenCompra {
  NroOrdenC: number;
  fechaEmision: string;
  Situacion: string;
  Total: number;
  laboratorio?: {
    razonSocial: string;
  };
}

export default function OrdenesCompra() {
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);

  useEffect(() => {
    fetch("/api/ordenes-compra")
      .then((res) => res.json())
      .then((data) => setOrdenes(data));
  }, []);

  const eliminarOrden = async (id: number) => {
    if (confirm("¿Desea eliminar esta orden de compra?")) {
      const res = await fetch(`/api/ordenes-compra/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOrdenes((prev) => prev.filter((o) => o.NroOrdenC !== id));
      } else {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Órdenes de Compra</h1>
      <Link href="/ordenes-compra/new">Registrar nueva orden</Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Fecha</th>
            <th>Situación</th>
            <th>Total</th>
            <th>Laboratorio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.NroOrdenC}>
              <td>{orden.NroOrdenC}</td>
              <td>{new Date(orden.fechaEmision).toLocaleDateString()}</td>
              <td>{orden.Situacion}</td>
              <td>{orden.Total}</td>
              <td>{orden.laboratorio?.razonSocial}</td>
              <td className={styles.actions}>
                <Link
                  href={`/ordenes-compra/edit/${orden.NroOrdenC}`}
                  className={styles.editButton}
                >
                  Editar
                </Link>
                <button
                  onClick={() => eliminarOrden(orden.NroOrdenC)}
                  className={styles.deleteButton}
                >
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
