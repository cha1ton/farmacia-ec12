'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styles from './EditOrdenCompra.module.css'

export default function EditarOrdenCompra() {
  const { id } = useParams()
  const router = useRouter()

  const [laboratorios, setLaboratorios] = useState<any[]>([])
  const [form, setForm] = useState({
    fechaEmision: '',
    Situacion: '',
    Total: '',
    NroFacturaProv: '',
    CodLab: ''
  })

  useEffect(() => {
    fetch('/api/laboratorios')
      .then(res => res.json())
      .then(data => setLaboratorios(data))

    fetch(`/api/ordenes-compra/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          fechaEmision: data.fechaEmision?.substring(0, 10),
          Situacion: data.Situacion,
          Total: data.Total.toString(),
          NroFacturaProv: data.NroFacturaProv,
          CodLab: data.CodLab.toString()
        })
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/ordenes-compra/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        Total: parseFloat(form.Total),
        CodLab: parseInt(form.CodLab),
        fechaEmision: new Date(form.fechaEmision).toISOString()
      })
    })

    if (res.ok) {
      router.push('/ordenes-compra')
    } else {
      alert('Error al actualizar')
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Editar Orden de Compra</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Fecha Emisión:
          <input type="date" name="fechaEmision" value={form.fechaEmision} onChange={handleChange} required />
        </label>
        <label>
          Situación:
          <input type="text" name="Situacion" value={form.Situacion} onChange={handleChange} required />
        </label>
        <label>
          Total:
          <input type="number" name="Total" step="0.01" value={form.Total} onChange={handleChange} required />
        </label>
        <label>
          Nro Factura Proveedor:
          <input type="text" name="NroFacturaProv" value={form.NroFacturaProv} onChange={handleChange} required />
        </label>
        <label>
          Laboratorio:
          <select name="CodLab" value={form.CodLab} onChange={handleChange} required>
            <option value="">Seleccione</option>
            {laboratorios.map(lab => (
              <option key={lab.CodLab} value={lab.CodLab}>
                {lab.razonSocial}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}
