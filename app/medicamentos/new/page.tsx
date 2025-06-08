'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NewMedicamento.module.css'
import Link from 'next/link'

export default function NuevoMedicamento() {
  const router = useRouter()
  const [tipos, setTipos] = useState([])
  const [especialidades, setEspecialidades] = useState([])

  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    presentacion: '',
    stock: '',
    precioVentaUni: '',
    precioVentaPres: '',
    Marca: '',
    CodTipoMed: '',
    CodEspec: '',
  })

  useEffect(() => {
    fetch('/api/tipos-medicamentos')
      .then(res => res.json())
      .then(setTipos)

    fetch('/api/especialidades')
      .then(res => res.json())
      .then(setEspecialidades)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/medicamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        stock: parseInt(form.stock),
        precioVentaUni: parseFloat(form.precioVentaUni),
        precioVentaPres: parseFloat(form.precioVentaPres),
        CodTipoMed: parseInt(form.CodTipoMed),
        CodEspec: parseInt(form.CodEspec),
        fechaFabricacion: new Date(form.fechaFabricacion).toISOString(),
        fechaVencimiento: new Date(form.fechaVencimiento).toISOString(),
      }),
    })

    if (res.ok) {
      router.push('/medicamentos')
    } else {
      alert('Error al registrar medicamento')
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Registrar Nuevo Medicamento</h1>
      <Link href="/medicamentos">← Volver</Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Descripción:
          <input name="descripcionMed" required onChange={handleChange} />
        </label>
        <label>
          Fecha Fabricación:
          <input type="date" name="fechaFabricacion" required onChange={handleChange} />
        </label>
        <label>
          Fecha Vencimiento:
          <input type="date" name="fechaVencimiento" required onChange={handleChange} />
        </label>
        <label>
          Presentación:
          <input name="presentacion" required onChange={handleChange} />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" required onChange={handleChange} />
        </label>
        <label>
          Precio Unitario:
          <input type="number" step="0.01" name="precioVentaUni" required onChange={handleChange} />
        </label>
        <label>
          Precio Presentación:
          <input type="number" step="0.01" name="precioVentaPres" required onChange={handleChange} />
        </label>
        <label>
          Marca:
          <input name="Marca" required onChange={handleChange} />
        </label>
        <label>
          Tipo Medicamento:
          <select name="CodTipoMed" required onChange={handleChange}>
            <option value="">Seleccione</option>
            {tipos.map((tipo: any) => (
              <option key={tipo.CodTipoMed} value={tipo.CodTipoMed}>{tipo.descripcion}</option>
            ))}
          </select>
        </label>
        <label>
          Especialidad:
          <select name="CodEspec" required onChange={handleChange}>
            <option value="">Seleccione</option>
            {especialidades.map((esp: any) => (
              <option key={esp.CodEspec} value={esp.CodEspec}>{esp.descripcionEsp}</option>
            ))}
          </select>
        </label>
        <button>Guardar</button>
      </form>
    </div>
  )
}
