import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const especialidad = await prisma.especialidad.findUnique({
    where: { CodEspec: Number(params.id) }
  })
  return NextResponse.json(especialidad)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.especialidad.update({
    where: { CodEspec: Number(params.id) },
    data
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const deleted = await prisma.especialidad.delete({
    where: { CodEspec: Number(params.id) }
  })
  return NextResponse.json(deleted)
}
