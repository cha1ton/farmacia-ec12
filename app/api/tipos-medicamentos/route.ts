import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()



// GET all tipos
export async function GET() {
  const tipos = await prisma.tipoMedic.findMany()
  return NextResponse.json(tipos)
}

// POST new tipo
export async function POST(req: Request) {
  const data = await req.json()
  const nuevoTipo = await prisma.tipoMedic.create({ data })
  return NextResponse.json(nuevoTipo)
}
