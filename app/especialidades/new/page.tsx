'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NuevaEspecialidad.module.css'

export default function NuevaEspecialidad() {
  const router = useRouter()
  const [descripcionEsp, setDescripcionEsp] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/especialidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcionEsp }),
    })

    if (res.ok) {
      router.push('/especialidades')
    } else {
      alert('Error al registrar especialidad')
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Registrar Nueva Especialidad</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcionEsp}
            onChange={(e) => setDescripcionEsp(e.target.value)}
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
