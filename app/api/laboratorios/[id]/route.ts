import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const lab = await prisma.laboratorio.findUnique({
    where: { CodLab: id }
  });

  if (!lab) {
    return NextResponse.json({ error: 'Laboratorio no encontrado' }, { status: 404 });
  }

  return NextResponse.json(lab);
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const data = await req.json();

  const updated = await prisma.laboratorio.update({
    where: { CodLab: id },
    data
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  await prisma.laboratorio.delete({
    where: { CodLab: id }
  });

  return NextResponse.json({ message: 'Eliminado' });
}
