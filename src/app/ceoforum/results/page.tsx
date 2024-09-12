import HederComponent from "@/app/components/heder";
import EmployeesTable from "@/app/components/members";
import Link from "next/link";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any;
}) {
  return {
    title: `Results for Check Number: ${searchParams.checkNumber || ""}`,
  };
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const checkNumber = searchParams.checkNumber || "";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <HederComponent />

      {/* Sub-heading */}
      <h2 className="text-2xl font-bold text-black mb-6">
        Results for Check Number: {checkNumber}
      </h2>

      {/* Button and Table Header Section */}
      <div className="w-full flex justify-between items-center px-6 mb-4">
        <Link href={process.env.NODE_ENV === "production" ? "/ceoforum" : "/"}>
          <button className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            Back
          </button>
        </Link>
        <Link
          href={
            process.env.NODE_ENV === "production"
              ? "/ceoforum/add-employee?checkNumber=" + checkNumber
              : "/add-employee?checkNumber=" + checkNumber
          }
        >
          <button className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            Add New Member
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <EmployeesTable checkNumber={checkNumber} />
    </div>
  );
}
