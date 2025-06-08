import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET({ params }: { params: { id: string } }) {
  const med = await prisma.medicamento.findUnique({
    where: { CodMedicamento: Number(params.id) },
    include: { tipoMedic: true }
  });
  return NextResponse.json(med);
}

export async function PUT({
  request,
  params
}: {
  request: Request;
  params: { id: string };
}) {
  const data = await request.json();
  const updated = await prisma.medicamento.update({
    where: { CodMedicamento: Number(params.id) },
    data
  });
  return NextResponse.json(updated);
}

export async function DELETE({ params }: { params: { id: string } }) {
  const deleted = await prisma.medicamento.delete({
    where: { CodMedicamento: Number(params.id) }
  });
  return NextResponse.json(deleted);
}
