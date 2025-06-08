import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const lab = await prisma.laboratorio.findUnique({
    where: { CodLab: parseInt(params.id) }
  })
  return NextResponse.json(lab)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json()
  const updated = await prisma.laboratorio.update({
    where: { CodLab: parseInt(params.id) },
    data
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.laboratorio.delete({
    where: { CodLab: parseInt(params.id) }
  })
  return NextResponse.json({ message: 'Eliminado' })
}
