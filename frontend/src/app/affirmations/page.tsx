'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAffirmations, addAffirmation, deleteAffirmation } from '../utils/api';

type Affirmation = {
  _id: string;
  text: string;
};

export default function AffirmationsPage() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [newAffirmation, setNewAffirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [dailyAffirmation, setDailyAffirmation] = useState<Affirmation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const router = useRouter();

  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const data = await getAffirmations();
        setAffirmations(data);

        // Set a random daily affirmation
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setDailyAffirmation(data[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching affirmations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffirmations();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(affirmations.length / itemsPerPage);
  const paginatedAffirmations = affirmations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddAffirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffirmation.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const addedAffirmation = await addAffirmation(newAffirmation, token || '');
      setAffirmations((prev) => [...prev, addedAffirmation]);
      setNewAffirmation('');
    } catch (error) {
      console.error('Error adding affirmation:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAffirmation(id, localStorage.getItem('token') || '');
      setAffirmations((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting affirmation:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    router.push('/'); // Redirect to homepage
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-4 max-w-3xl mx-auto">
      {/* Header Section with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Affirmations</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Daily Affirmation */}
      {dailyAffirmation && (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Daily Affirmation</h2>
          <p className="text-xl text-blue-700 italic">{dailyAffirmation.text}</p>
        </div>
      )}

      {/* Form to Add New Affirmation */}
      <form onSubmit={handleAddAffirmation} className="mb-6">
        <input
          type="text"
          placeholder="Add a new affirmation..."
          value={newAffirmation}
          onChange={(e) => setNewAffirmation(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Add Affirmation
        </button>
      </form>

      {/* Affirmations List */}
      <ul>
        {paginatedAffirmations.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center mb-4 border p-4 rounded shadow"
          >
            <span>{item.text}</span>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
