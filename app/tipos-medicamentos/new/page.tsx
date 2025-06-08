'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NuevoTipo.module.css'

export default function NuevoTipoMedicamento() {
  const router = useRouter()
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/tipos-medicamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion }),
    })

    if (res.ok) {
      router.push('/tipos-medicamentos')
    } else {
      alert('Error al registrar tipo')
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Registrar Nuevo Tipo</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <div className={styles.buttonWrapper}>
          <button>Guardar</button>
        </div>
      </form>
    </div>
  )
}
