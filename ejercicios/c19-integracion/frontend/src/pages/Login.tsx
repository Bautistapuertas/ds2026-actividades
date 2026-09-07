import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria")
});

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validacion = loginSchema.safeParse({ email, password });
    if (!validacion.success) {
      setError(validacion.error.errors[0].message);
      return;
    }

    try {
      const res = await apiFetch<{token: string}>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(validacion.data)
      });
      guardarToken(res.token);
      navigate('/catalogo');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Entrar</button>
      </form>
    </div>
  );
}
