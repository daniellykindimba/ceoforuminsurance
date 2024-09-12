import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { employee_id: string } }
) {
  const { employee_id } = params;
  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: Number(employee_id) },
    });
    return NextResponse.json(deletedEmployee);
  } catch (error) {
    return NextResponse.error();
  }
}
