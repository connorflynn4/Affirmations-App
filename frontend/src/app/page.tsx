'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticated(false); // Update authentication state
    router.push('/'); // Redirect to home
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Affirmations App</h1>
      <p className="text-lg text-gray-700 mb-4">
        Empower yourself with positive affirmations. Get started now!
      </p>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => router.push('/affirmations')}
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            >
              View Affirmations
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </main>
  );
}
