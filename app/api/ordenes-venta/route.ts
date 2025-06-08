import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const ordenes = await prisma.ordenVenta.findMany({
    include: {
      detalles: {
        include: {
          medicamento: true
        }
      }
    }
  })
  return NextResponse.json(ordenes)
}

export async function POST(req: Request) {
  const data = await req.json()

  const nuevaOrden = await prisma.ordenVenta.create({
    data: {
      fechaEmision: new Date(data.fechaEmision),
      Motivo: data.Motivo,
      Situacion: data.Situacion,
      detalles: {
        create: data.detalles.map((detalle: any) => ({
          CodMedicamento: detalle.CodMedicamento,
          descripcionMed: detalle.descripcionMed,
          cantidadRequerida: detalle.cantidadRequerida
        }))
      }
    },
    include: {
      detalles: true
    }
  })

  return NextResponse.json(nuevaOrden)
}
