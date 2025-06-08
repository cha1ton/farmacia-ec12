'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import styles from '../../Laboratorios.module.css'

export default function EditarLaboratorio() {
  const router = useRouter()
  const { id } = useParams()

  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: '',
  })

  useEffect(() => {
    fetch(`/api/laboratorios/${id}`)
      .then(res => res.json())
      .then(data => setForm(data))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/laboratorios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/laboratorios')
    } else {
      alert('Error al actualizar laboratorio')
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Editar Laboratorio</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Razón Social:
          <input type="text" name="razonSocial" value={form.razonSocial} onChange={handleChange} required />
        </label>
        <label>
          Dirección:
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Contacto:
          <input type="text" name="contacto" value={form.contacto} onChange={handleChange} required />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  )
}
