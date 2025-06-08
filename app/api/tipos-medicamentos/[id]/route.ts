import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()



export async function GET(_: Request, { params }: { params: { id: string } }) {
  const tipo = await prisma.tipoMedic.findUnique({ where: { CodTipoMed: Number(params.id) } })
  return NextResponse.json(tipo)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.tipoMedic.update({
    where: { CodTipoMed: Number(params.id) },
    data
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const deleted = await prisma.tipoMedic.delete({ where: { CodTipoMed: Number(params.id) } })
  return NextResponse.json(deleted)
}
