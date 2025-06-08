//app/api/especialidades/[id]/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET({ params }: { params: { id: string } }) {
  const especialidad = await prisma.especialidad.findUnique({
    where: { CodEspec: Number(params.id) },
  });
  return NextResponse.json(especialidad);
}

export async function PUT({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) {
  const data = await request.json();
  const updated = await prisma.especialidad.update({
    where: { CodEspec: Number(params.id) },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE({ params }: { params: { id: string } }) {
  const deleted = await prisma.especialidad.delete({
    where: { CodEspec: Number(params.id) },
  });
  return NextResponse.json(deleted);
}
