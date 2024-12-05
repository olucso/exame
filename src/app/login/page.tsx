'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const request = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const response = await request.json();
      if (!response.token) {
        throw new Error(response.message);
      }

      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro inesperado';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center text-neutral-950">Login</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-neutral-950">
          Nome de Usuário
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-950">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      >
        {loading ? 'Carregando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginPage;