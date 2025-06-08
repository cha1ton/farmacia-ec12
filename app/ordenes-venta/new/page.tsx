"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NewOrdenVenta.module.css";

type Medicamento = {
  CodMedicamento: number;
  descripcionMed: string;
};

type DetalleOrdenVenta = {
  CodMedicamento: string;
  descripcionMed: string;
  cantidadRequerida: string;
};

export default function NuevaOrdenVenta() {
  const router = useRouter();
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [form, setForm] = useState({
    fechaEmision: "",
    Motivo: "",
    Situacion: "",
  });

  const [detalles, setDetalles] = useState<DetalleOrdenVenta[]>([
    { CodMedicamento: "", descripcionMed: "", cantidadRequerida: "" },
  ]);

  useEffect(() => {
    fetch("/api/medicamentos")
      .then((res) => res.json())
      .then((data) => setMedicamentos(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetalleChange = (
    index: number,
    field: keyof DetalleOrdenVenta,
    value: string
  ) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [field]: value,
    };

    if (field === "CodMedicamento") {
      const med = medicamentos.find(
        (m) => m.CodMedicamento === parseInt(value)
      );
      nuevosDetalles[index].descripcionMed = med?.descripcionMed || "";
    }

    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([
      ...detalles,
      { CodMedicamento: "", descripcionMed: "", cantidadRequerida: "" },
    ]);
  };

  const eliminarDetalle = (index: number) => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/ordenes-venta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        fechaEmision: new Date(form.fechaEmision).toISOString(),
        detalles: detalles.map((d) => ({
          CodMedicamento: parseInt(d.CodMedicamento),
          descripcionMed: d.descripcionMed,
          cantidadRequerida: parseInt(d.cantidadRequerida),
        })),
      }),
    });

    if (res.ok) {
      router.push("/ordenes-venta");
    } else {
      alert("Error al registrar orden");
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Registrar Nueva Orden de Venta</h1>
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
          Motivo:
          <input type="text" name="Motivo" required onChange={handleChange} />
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

        <h3>Detalles</h3>
        {detalles.map((detalle, index) => (
          <div key={index} className={styles.detalle}>
            <label>
              Medicamento:
              <select
                value={detalle.CodMedicamento}
                onChange={(e) =>
                  handleDetalleChange(index, "CodMedicamento", e.target.value)
                }
                required
              >
                <option value="">Seleccione</option>
                {medicamentos.map((m) => (
                  <option key={m.CodMedicamento} value={m.CodMedicamento}>
                    {m.descripcionMed}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                value={detalle.cantidadRequerida}
                onChange={(e) =>
                  handleDetalleChange(
                    index,
                    "cantidadRequerida",
                    e.target.value
                  )
                }
                required
              />
            </label>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => eliminarDetalle(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={agregarDetalle}>
          + Agregar Detalle
        </button>
        <div>
          <button className={styles.submitButton}>Guardar</button>
        </div>
      </form>
    </div>
  );
}
