import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const ordenes = await prisma.ordenCompra.findMany({
    include: {
      laboratorio: true,
      detalles: true
    }
  })
  return NextResponse.json(ordenes)
}

export async function POST(req: Request) {
  const data = await req.json()

  const nuevaOrden = await prisma.ordenCompra.create({
    data: {
      fechaEmision: new Date(data.fechaEmision),
      Situacion: data.Situacion,
      Total: data.Total,
      NroFacturaProv: data.NroFacturaProv,
      laboratorio: {
        connect: { CodLab: data.CodLab }
      },
      detalles: {
        create: data.detalles.map((detalle: any) => ({
          CodMedicamento: detalle.CodMedicamento,
          descripcion: detalle.descripcion,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          montouni: detalle.montouni
        }))
      }
    },
    include: {
      detalles: true,
      laboratorio: true
    }
  })

  return NextResponse.json(nuevaOrden)
}

