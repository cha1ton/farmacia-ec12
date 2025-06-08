import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const meds = await prisma.medicamento.findMany({
    include: {
      especialidad: true,
      tipoMedic: true,
    },
  })
  return NextResponse.json(meds)
}

export async function POST(req: Request) {
  const data = await req.json()
  const newMed = await prisma.medicamento.create({
    data,
  })
  return NextResponse.json(newMed)
}
