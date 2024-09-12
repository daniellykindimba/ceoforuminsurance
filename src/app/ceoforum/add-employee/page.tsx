"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HederComponent from "@/app/components/heder";

export default function AddEmployee({ searchParams }: { searchParams: any }) {
  const checkNumber = searchParams.checkNumber || "";
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [check_number, setCheckNumber] = useState(checkNumber);
  const [employee_type, setEmployeeType] = useState("SM");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "/ceoforum/api/employees"
        : "/api/employees";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        middle_name,
        last_name,
        check_number,
        employee_type,
      }),
    });
    console.log(res);
    // get json response
    const data = await res.json();
    console.log(data);
    if (data.success) {
      if (process.env.NODE_ENV === "production") {
        router.push("/ceoforum/results?checkNumber=" + checkNumber);
      } else {
        router.push("/results?checkNumber=" + checkNumber);
      }
    } else {
      setErrorMessage(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <HederComponent />
      <div className="container mx-auto p-4 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-black">Add New Member</h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              value={middle_name}
              onChange={(e) => setMiddleName(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check Number
            </label>
            <input
              type="text"
              value={check_number}
              onChange={(e) => setCheckNumber(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={!!checkNumber}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Type
            </label>
            <select
              value={employee_type}
              onChange={(e) => setEmployeeType(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="SM">CEO</option>
              <option value="SS">Spouse</option>
              <option value="SP">Parent</option>
              <option value="SPI">Inlaw</option>
              <option value="SC">Child</option>
            </select>
          </div>
          <div className="flex justify-between">
            <Link
              href={
                process.env.NODE_ENV === "production"
                  ? "/ceoforum/results?checkNumber=" + checkNumber
                  : "/results?checkNumber=" + checkNumber
              }
            >
              <button
                type="submit"
                className=" py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
