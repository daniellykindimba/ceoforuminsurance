import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { first_name, middle_name, last_name, check_number, employee_type } =
      await request.json();

    if (
      !first_name ||
      !check_number ||
      !employee_type ||
      !last_name ||
      !middle_name
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide all required fields.",
        },
        { status: 400 }
      );
    }

    // Check if an employee with the same check_number and employee_type of 'SM' exists
    if (employee_type === "SM") {
      const existingEmployee = await prisma.employee.findFirst({
        where: {
          check_number: check_number,
          employee_type: "SM",
        },
      });

      if (existingEmployee) {
        return NextResponse.json({
          success: false,
          error:
            "A CEO Member with the same check number already exists. Only one CEO Member is allowed.",
        });
      }
    }

    // Check if an employee with the same check_number and employee_type of 'SS' exists
    if (employee_type === "SS") {
      const existingEmployee = await prisma.employee.findFirst({
        where: {
          check_number: check_number,
          employee_type: "SS",
        },
      });

      if (existingEmployee) {
        return NextResponse.json({
          success: false,
          error: "Only one Spouse is allowed.",
        });
      }
    }

    // check if employe with employee_type of 'SP'do not exceed 2
    if (employee_type === "SP") {
      const existingEmployee = await prisma.employee.findMany({
        where: {
          check_number: check_number,
          employee_type: "SP",
        },
      });

      if (existingEmployee.length >= 2) {
        return NextResponse.json({
          success: false,
          error: "Only two Parents are allowed.",
        });
      }
    }

    // check if employe with employee_type of 'SP'do not exceed 2
    if (employee_type === "SPI") {
      const existingEmployee = await prisma.employee.findMany({
        where: {
          check_number: check_number,
          employee_type: "SPI",
        },
      });

      if (existingEmployee.length >= 2) {
        return NextResponse.json({
          success: false,
          error: "Only two Parent Inlaws are allowed.",
        });
      }
    }

    // check if employe with employee_type of 'SP'do not exceed 2
    if (employee_type === "SC") {
      const existingEmployee = await prisma.employee.findMany({
        where: {
          check_number: check_number,
          employee_type: "SC",
        },
      });

      if (existingEmployee.length >= 4) {
        return NextResponse.json({
          success: false,
          error: "Only Four Children are allowed.",
        });
      }
    }

    const newEmployee = await prisma.employee.create({
      data: {
        first_name,
        middle_name,
        last_name,
        check_number,
        employee_type,
      },
    });
    return NextResponse.json({
      success: true,
      data: newEmployee,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while adding the employee." + error,
      },
      { status: 500 }
    );
  }
}

// retrieve all employees by check number
export async function GET(request: Request) {
  // get check number from query params
  const url = new URL(request.url);
  const checkNumber = url.searchParams.get("checkNumber");

  try {
    const employees = await prisma.employee.findMany({
      where: {
        check_number: checkNumber?.toString(),
      },
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.error();
  }
}
