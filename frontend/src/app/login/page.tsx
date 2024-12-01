'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../utils/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(username, password); // Call login API
      localStorage.setItem('token', response.token); // Store token in localStorage
      setError(''); // Clear any previous error
      router.push('/affirmations'); // Redirect to affirmations page
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid username or password. Please try again.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      <p className="mt-4">
        Don't have an account?{' '}
        <span
          onClick={() => router.push('/signup')}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Signup here
        </span>.
      </p>
    </main>
  );
}
