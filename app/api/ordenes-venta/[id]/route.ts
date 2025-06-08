import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Obtener una orden por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const orden = await prisma.ordenVenta.findUnique({
    where: { NroOrdenVta: id },
    include: {
      detalles: {
        include: {
          medicamento: true,
        },
      },
    },
  });

  if (!orden) {
    return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
  }

  return NextResponse.json(orden);
}

// DELETE: Eliminar una orden
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  await prisma.detalleOrdenVta.deleteMany({ where: { NroOrdenVta: id } });
  await prisma.ordenVenta.delete({ where: { NroOrdenVta: id } });

  return NextResponse.json({ message: "Orden eliminada" });
}

// PUT: Editar una orden
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const data = await req.json();

  await prisma.detalleOrdenVta.deleteMany({ where: { NroOrdenVta: id } });

  const ordenActualizada = await prisma.ordenVenta.update({
    where: { NroOrdenVta: id },
    data: {
      fechaEmision: new Date(data.fechaEmision),
      Motivo: data.Motivo,
      Situacion: data.Situacion,
      detalles: {
        create: data.detalles.map((detalle: any) => ({
          CodMedicamento: parseInt(detalle.CodMedicamento),
          descripcionMed: detalle.descripcionMed,
          cantidadRequerida: parseInt(detalle.cantidadRequerida),
        })),
      },
    },
    include: {
      detalles: true,
    },
  });

  return NextResponse.json(ordenActualizada);
}
