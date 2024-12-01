'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '../utils/api';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup(username, password);
      setSuccess(true);
      setError('');
      // Redirect to login page after successful signup
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Signup</h1>

      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
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
          Signup
        </button>
      </form>

      {success && (
        <p className="text-green-500 mt-4">
          Signup successful! Redirecting to login...
        </p>
      )}
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}
    </main>
  );
}
