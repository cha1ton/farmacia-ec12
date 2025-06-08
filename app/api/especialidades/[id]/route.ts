import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const especialidad = await prisma.especialidad.findUnique({
    where: { CodEspec: Number(id) },
  });
  return NextResponse.json(especialidad);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await req.json();
  const updated = await prisma.especialidad.update({
    where: { CodEspec: Number(id) },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const deleted = await prisma.especialidad.delete({
    where: { CodEspec: Number(id) },
  });
  return NextResponse.json(deleted);
}
