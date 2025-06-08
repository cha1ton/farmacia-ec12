//app/ordenes-venta/edit/[id]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styles from '../OrdenVentaForm.module.css'

export default function EditarOrdenVenta() {
  const { id } = useParams()
  const router = useRouter()

  const [medicamentos, setMedicamentos] = useState<any[]>([])
  const [form, setForm] = useState({
    fechaEmision: '',
    Motivo: '',
    Situacion: '',
  })
  const [detalles, setDetalles] = useState([
    { CodMedicamento: '', descripcionMed: '', cantidadRequerida: '' }
  ])

  // Cargar medicamentos y datos de la orden actual
  useEffect(() => {
  if (!id) return

  fetch('/api/medicamentos')
    .then(res => res.json())
    .then(data => setMedicamentos(data))

  fetch(`/api/ordenes-venta/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar orden')
      return res.json()
    })
    .then(data => {
      setForm({
        fechaEmision: data.fechaEmision?.substring(0, 10),
        Motivo: data.Motivo,
        Situacion: data.Situacion,
      })
      setDetalles(
        data.detalles.map((d: any) => ({
          CodMedicamento: d.CodMedicamento.toString(),
          descripcionMed: d.descripcionMed,
          cantidadRequerida: d.cantidadRequerida.toString()
        }))
      )
    })
    .catch(err => {
      console.error(err)
      alert('Error cargando la orden')
    })
}, [id])


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDetalleChange = (index: number, field: keyof typeof detalles[0], value: string) => {
    const nuevosDetalles = [...detalles]
    nuevosDetalles[index][field] = value

    if (field === 'CodMedicamento') {
      const med = medicamentos.find((m: any) => m.CodMedicamento === parseInt(value))
      nuevosDetalles[index].descripcionMed = med?.descripcionMed || ''
    }

    setDetalles(nuevosDetalles)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/ordenes-venta/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        fechaEmision: new Date(form.fechaEmision).toISOString(),
        detalles: detalles.map(d => ({
          CodMedicamento: parseInt(d.CodMedicamento),
          descripcionMed: d.descripcionMed,
          cantidadRequerida: parseInt(d.cantidadRequerida)
        }))
      })
    })

    if (res.ok) {
      router.push('/ordenes-venta')
    } else {
      alert('Error al actualizar orden')
    }
  }

  const agregarDetalle = () => {
    setDetalles([...detalles, { CodMedicamento: '', descripcionMed: '', cantidadRequerida: '' }])
  }

  const eliminarDetalle = (index: number) => {
    const nuevosDetalles = [...detalles]
    nuevosDetalles.splice(index, 1)
    setDetalles(nuevosDetalles)
  }

  return (
    <div>
      <h1 className={styles.title}>Editar Orden de Venta</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Fecha Emisión:
          <input type="date" name="fechaEmision" value={form.fechaEmision} onChange={handleChange} required />
        </label>
        <label>
          Motivo:
          <input type="text" name="Motivo" value={form.Motivo} onChange={handleChange} required />
        </label>
        <label>
          Situación:
          <input type="text" name="Situacion" value={form.Situacion} onChange={handleChange} required />
        </label>

        <h3>Detalles</h3>
        {detalles.map((detalle, i) => (
          <div key={i} className={styles.detalleItem}>
            <select
              value={detalle.CodMedicamento}
              onChange={(e) => handleDetalleChange(i, 'CodMedicamento', e.target.value)}
              required
            >
              <option value="">Seleccione medicamento</option>
              {medicamentos.map(med => (
                <option key={med.CodMedicamento} value={med.CodMedicamento}>
                  {med.descripcionMed}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Cantidad"
              value={detalle.cantidadRequerida}
              onChange={(e) => handleDetalleChange(i, 'cantidadRequerida', e.target.value)}
              required
            />
            <button type="button" onClick={() => eliminarDetalle(i)}>Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={agregarDetalle}>Agregar Detalle</button>
        <button className={styles.submitButton}>Guardar</button>
      </form>
    </div>
  )
}
