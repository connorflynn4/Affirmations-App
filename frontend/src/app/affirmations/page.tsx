"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAffirmations, addAffirmation, deleteAffirmation } from "../utils/api";
import SideMenu from "../components/SideMenu";
import useAffirmationsStore from "../stores/useAffirmationsStore";

type Affirmation = {
  _id: string;
  text: string;
  isFavorite?: boolean;
};

export default function AffirmationsPage() {
  const { affirmations, setAffirmations, toggleFavorite } = useAffirmationsStore();
  const [affirmationOfTheDay, setAffirmationOfTheDay] = useState<Affirmation | null>(null);
  const [newAffirmation, setNewAffirmation] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const data = await getAffirmations();
        setAffirmations(data);

        const today = new Date().toDateString();
        const storedAffirmation = JSON.parse(localStorage.getItem("affirmationOfTheDay") || "{}");

        if (storedAffirmation.date === today) {
          setAffirmationOfTheDay(storedAffirmation.affirmation);
        } else if (data.length > 0) {
          const randomAffirmation = data[Math.floor(Math.random() * data.length)];
          setAffirmationOfTheDay(randomAffirmation);
          localStorage.setItem(
            "affirmationOfTheDay",
            JSON.stringify({ date: today, affirmation: randomAffirmation })
          );
        }
      } catch (error) {
        console.error("Error fetching affirmations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffirmations();
  }, [setAffirmations]);

  const handleAddAffirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffirmation.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const addedAffirmation = await addAffirmation(newAffirmation, token || "");
      setAffirmations([addedAffirmation, ...affirmations]);
      setNewAffirmation("");
    } catch (error) {
      console.error("Error adding affirmation:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await deleteAffirmation(id, token || "");
      setAffirmations(affirmations.filter((item: Affirmation) => item._id !== id));
    } catch (error) {
      console.error("Error deleting affirmation:", error);
    }
  };

  const totalPages = Math.ceil(affirmations.length / itemsPerPage);
  const paginatedAffirmations = affirmations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <SideMenu />

      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6 p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Affirmation of the Day</h2>
          {affirmationOfTheDay ? (
            <p className="text-gray-700 italic">"{affirmationOfTheDay.text}"</p>
          ) : (
            <p className="text-gray-500">No affirmations available.</p>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-6">Your Affirmations</h1>

        {/* Add Affirmation Section */}
        <form onSubmit={handleAddAffirmation} className="mb-8 flex flex-col items-center">
          <input
            type="text"
            placeholder="Add a new affirmation..."
            value={newAffirmation}
            onChange={(e) => setNewAffirmation(e.target.value)}
            className="w-full md:w-3/4 lg:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add Affirmation
          </button>
        </form>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedAffirmations.map((item: Affirmation) => (
            <div
              key={item._id}
              className="flex flex-col justify-between p-6 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <p className="text-gray-800 text-lg italic mb-4">"{item.text}"</p>
              <div className="flex justify-between items-center">
  {/* Favorite Button */}
  <button
    onClick={() => toggleFavorite(item._id)}
    className={`text-xl ${
      item.isFavorite
        ? "text-yellow-500 hover:text-yellow-600"
        : "text-gray-400 hover:text-gray-600"
    }`}
    aria-label="Toggle Favorite"
  >
    {item.isFavorite ? "★" : "☆"}
  </button>

  {/* Delete Button */}
  <button
    onClick={() => handleDelete(item._id)}
    className="text-red-500 hover:text-red-600 text-xl font-bold cursor-pointer"
    aria-label="Delete Affirmation"
  >
    ✕
  </button>
</div>

            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`text-gray-400 hover:text-blue-500`}
              aria-label="Previous Page"
            >
              ←
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`text-gray-400 hover:text-blue-500`}
              aria-label="Next Page"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
