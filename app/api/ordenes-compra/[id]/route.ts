import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const orden = await prisma.ordenCompra.findUnique({
    where: { NroOrdenC: id },
    include: { laboratorio: true }
  });

  if (!orden) {
    return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
  }

  return NextResponse.json(orden);
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const data = await req.json();

  const updated = await prisma.ordenCompra.update({
    where: { NroOrdenC: id },
    data: {
      fechaEmision: new Date(data.fechaEmision),
      Situacion: data.Situacion,
      Total: parseFloat(data.Total),
      NroFacturaProv: data.NroFacturaProv,
      CodLab: parseInt(data.CodLab)
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  await prisma.ordenCompra.delete({ where: { NroOrdenC: id } });

  return NextResponse.json({ message: 'Orden eliminada' });
}
