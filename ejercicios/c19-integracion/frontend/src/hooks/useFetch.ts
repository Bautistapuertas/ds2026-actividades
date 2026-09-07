import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function cargar() {
      try {
        const resultado = await apiFetch<T>(url);
        if (montado) setData(resultado);
      } catch (err: any) {
        if (montado) setError(err.message);
      } finally {
        if (montado) setLoading(false);
      }
    }

    cargar();
    return () => { montado = false; };
  }, [url]);

  return { data, loading, error };
}
