import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const especialidad = await prisma.especialidad.findUnique({
    where: { CodEspec: id },
  });

  if (!especialidad) {
    return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  }

  return NextResponse.json(especialidad);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await req.json();

  const updated = await prisma.especialidad.update({
    where: { CodEspec: id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  await prisma.especialidad.delete({
    where: { CodEspec: id },
  });

  return NextResponse.json({ message: "Especialidad eliminada" });
}
