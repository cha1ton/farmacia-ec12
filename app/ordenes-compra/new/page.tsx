"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./NewOrdenCompra.module.css";
import Link from "next/link";

export default function NuevaOrdenCompra() {
  const router = useRouter();
  const [laboratorios, setLaboratorios] = useState([]);
  const [form, setForm] = useState({
    fechaEmision: "",
    Situacion: "",
    Total: "",
    NroFacturaProv: "",
    CodLab: "",
  });

  const [detalles, setDetalles] = useState([
    {
      CodMedicamento: "",
      descripcion: "",
      cantidad: "",
      precio: "",
      montouni: "",
    },
  ]);

  useEffect(() => {
    fetch("/api/laboratorios")
      .then((res) => res.json())
      .then((data) => setLaboratorios(data));
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [detalles]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetalleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDetalles = [...detalles];
    const { name, value } = e.target;
    newDetalles[index][name as keyof (typeof newDetalles)[0]] = value;

    // Si cantidad y precio están disponibles, actualiza montouni
    if (name === "cantidad" || name === "precio") {
      const cantidad = parseFloat(newDetalles[index].cantidad) || 0;
      const precio = parseFloat(newDetalles[index].precio) || 0;
      newDetalles[index].montouni = (cantidad * precio).toFixed(2);
    }

    setDetalles(newDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([
      ...detalles,
      {
        CodMedicamento: "",
        descripcion: "",
        cantidad: "",
        precio: "",
        montouni: "",
      },
    ]);
  };

  const eliminarDetalle = (index: number) => {
    const nuevos = [...detalles];
    nuevos.splice(index, 1);
    setDetalles(nuevos);
  };

  const calcularTotal = () => {
    const total = detalles.reduce(
      (acc, d) => acc + (parseFloat(d.montouni) || 0),
      0
    );
    setForm((prev) => ({ ...prev, Total: total.toFixed(2) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calcular el total directamente antes de enviar
    const total = detalles.reduce(
      (acc, d) => acc + (parseFloat(d.montouni) || 0),
      0
    );

    const res = await fetch("/api/ordenes-compra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        Total: total,
        CodLab: parseInt(form.CodLab),
        fechaEmision: new Date(form.fechaEmision).toISOString(),
        detalles: detalles.map((d) => ({
          CodMedicamento: parseInt(d.CodMedicamento),
          descripcion: d.descripcion,
          cantidad: parseInt(d.cantidad),
          precio: parseFloat(d.precio),
          montouni: parseFloat(d.montouni),
        })),
      }),
    });

    if (res.ok) {
      router.push("/ordenes-compra");
    } else {
      alert("Error al registrar orden");
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Registrar Nueva Orden de Compra</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Fecha Emisión:
          <input
            type="date"
            name="fechaEmision"
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Situación:
          <input
            type="text"
            name="Situacion"
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Nro Factura Proveedor:
          <input
            type="text"
            name="NroFacturaProv"
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Laboratorio:
          <select name="CodLab" required onChange={handleChange}>
            <option value="">Seleccione</option>
            {laboratorios.map((lab: any) => (
              <option key={lab.CodLab} value={lab.CodLab}>
                {lab.razonSocial}
              </option>
            ))}
          </select>
        </label>

        <h3>Detalles de la Orden</h3>
        {detalles.map((detalle, i) => (
          <div key={i} className={styles.detalleRow}>
            <input
              type="number"
              name="CodMedicamento"
              placeholder="Código"
              value={detalle.CodMedicamento}
              onChange={(e) => handleDetalleChange(i, e)}
              required
            />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={detalle.descripcion}
              onChange={(e) => handleDetalleChange(i, e)}
              required
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={detalle.cantidad}
              onChange={(e) => handleDetalleChange(i, e)}
              required
            />
            <input
              type="number"
              name="precio"
              step="0.01"
              placeholder="Precio"
              value={detalle.precio}
              onChange={(e) => handleDetalleChange(i, e)}
              required
            />
            <input
              type="text"
              name="montouni"
              placeholder="Monto Unitario"
              value={detalle.montouni}
              readOnly
            />
            <button type="button" onClick={() => eliminarDetalle(i)}>
              🗑️
            </button>
          </div>
        ))}

        <button type="button" onClick={agregarDetalle}>
          + Agregar detalle
        </button>

        <div>
          <strong>Total: </strong> S/. {form.Total || "0.00"}
        </div>

        <button type="submit">Guardar</button>
        <Link href="/ordenes-compra">← Volver</Link>
      </form>
    </div>
  );
}
