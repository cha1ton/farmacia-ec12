import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const med = await prisma.medicamento.findUnique({
    where: { CodMedicamento: id },
    include: { tipoMedic: true }
  });
  return NextResponse.json(med);
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const data = await req.json();
  const updated = await prisma.medicamento.update({
    where: { CodMedicamento: id },
    data
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const deleted = await prisma.medicamento.delete({
    where: { CodMedicamento: id }
  });
  return NextResponse.json(deleted);
}
