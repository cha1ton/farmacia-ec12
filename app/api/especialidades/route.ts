import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const especialidades = await prisma.especialidad.findMany()
  return NextResponse.json(especialidades)
}

export async function POST(req: Request) {
  const data = await req.json()
  const nueva = await prisma.especialidad.create({ data })
  return NextResponse.json(nueva)
}
