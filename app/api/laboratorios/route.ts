import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const laboratorios = await prisma.laboratorio.findMany()
  return NextResponse.json(laboratorios)
}

export async function POST(req: Request) {
  const data = await req.json()
  const nuevo = await prisma.laboratorio.create({ data })
  return NextResponse.json(nuevo)
}
