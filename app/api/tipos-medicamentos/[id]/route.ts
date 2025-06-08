import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const tipo = await prisma.tipoMedic.findUnique({
    where: { CodTipoMed: id }
  });

  if (!tipo) {
    return NextResponse.json({ error: 'Tipo no encontrado' }, { status: 404 });
  }

  return NextResponse.json(tipo);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const data = await req.json();

  const updated = await prisma.tipoMedic.update({
    where: { CodTipoMed: id },
    data
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  await prisma.tipoMedic.delete({
    where: { CodTipoMed: id }
  });

  return NextResponse.json({ message: 'Tipo eliminado' });
}
