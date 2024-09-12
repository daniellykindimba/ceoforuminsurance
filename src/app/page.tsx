"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HederComponent from "./components/heder";

export default function Home() {
  const [checkNumber, setCheckNumber] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (process.env.NODE_ENV === "production") {
      router.push(`/ceoforum/results?checkNumber=${checkNumber}`);
    } else {
      router.push(`/results?checkNumber=${checkNumber}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <HederComponent />

      {/* add a description for proving a check number to preceed with application */}
      <p className="text-lg font-semibold text-black mb-6">
        Please provide a check number to proceed with the application.
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <label className="block mb-4">
          <span className="text-gray-700">Check Number:</span>
          <input
            type="text"
            value={checkNumber}
            onChange={(e) => setCheckNumber(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter check number"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
