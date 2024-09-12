"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  check_number: string;
  employee_type: string;
}

// Client-side component for displaying the employee data
export default function EmployeesTable({
  checkNumber,
}: {
  checkNumber: string;
}) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // a function to delete an employee
  const deleteEmployee = async (id: number) => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "/ceoforum/api/delete-employee"
        : "/api/delete-employee";

    try {
      const response = await fetch(apiUrl + `/${id}`);
      if (response.ok) {
        alert("Employee deleted successfully.");
        window.location.reload();
      } else {
        alert("An error occurred while deleting the employee.");
      }
    } catch (error) {
      alert("An error occurred while deleting the employee.");
    }
  };

  //   a function to get all employees by check number
  const getEmployees = async (checkNumber: string) => {
    setLoading(true);
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "/ceoforum/api/employees"
        : "/api/employees";
    const response = await fetch(apiUrl + `?checkNumber=${checkNumber}`);
    if (response.ok) {
      const data = await response.json();
      setEmployees(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmployees(checkNumber);
  }, [checkNumber]);

  if (loading) {
    return (
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    );
  }

  return employees.length > 0 ? (
    <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">First Name</th>
          <th className="py-3 px-6 text-left">Middle Name</th>
          <th className="py-3 px-6 text-left">Last Name</th>
          <th className="py-3 px-6 text-left">Check Number</th>
          <th className="py-3 px-6 text-left">Member Type</th>
          <th className="py-3 px-6 text-left">Action(s)</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm">
        {employees.map((employee) => (
          <tr
            key={employee.id}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="py-3 px-6 text-left">{employee.first_name}</td>
            <td className="py-3 px-6 text-left">{employee.middle_name}</td>
            <td className="py-3 px-6 text-left">{employee.last_name}</td>
            <td className="py-3 px-6 text-left">{employee.check_number}</td>
            <td className="py-3 px-6 text-left">{employee.employee_type}</td>
            <td className="py-3 px-6 text-left">
              {/* <Link href={"/api/delete-employee/" + employee.id}> */}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteEmployee(employee.id)}
              >
                Delete
              </button>
              {/* </Link> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-red-500">No results found for this check number.</p>
  );
}
