'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NewLaboratorio.module.css'

export default function NuevoLaboratorio() {
  const router = useRouter()
  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/laboratorios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      router.push('/laboratorios')
    } else {
      alert('Error al registrar laboratorio')
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Registrar Laboratorio</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Razón Social:
          <input type="text" name="razonSocial" required onChange={handleChange} />
        </label>
        <label>
          Dirección:
          <input type="text" name="direccion" required onChange={handleChange} />
        </label>
        <label>
          Teléfono:
          <input type="text" name="telefono" required onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" required onChange={handleChange} />
        </label>
        <label>
          Contacto:
          <input type="text" name="contacto" required onChange={handleChange} />
        </label>
        <button>Guardar</button>
      </form>
    </div>
  )
}
