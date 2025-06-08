import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET({ params }: { params: { id: string } }) {
  const lab = await prisma.laboratorio.findUnique({
    where: { CodLab: parseInt(params.id) }
  });
  return NextResponse.json(lab);
}

export async function PUT({
  request,
  params
}: {
  request: Request;
  params: { id: string };
}) {
  const data = await request.json();
  const updated = await prisma.laboratorio.update({
    where: { CodLab: parseInt(params.id) },
    data
  });
  return NextResponse.json(updated);
}

export async function DELETE({ params }: { params: { id: string } }) {
  await prisma.laboratorio.delete({
    where: { CodLab: parseInt(params.id) }
  });
  return NextResponse.json({ message: 'Eliminado' });
}
