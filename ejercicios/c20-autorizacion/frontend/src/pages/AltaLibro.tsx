import { useState } from "react";
import { bookSchema, BookFormData } from "../validations/bookSchema";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export function AltaLibro() {
  const [formData, setFormData] = useState<Partial<BookFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const result = bookSchema.safeParse(formData);
    if (!result.success) {
      const formErrors: any = {};
      result.error.issues.forEach(issue => {
        formErrors[issue.path[0]] = issue.message;
      });
      setErrors(formErrors);
      return;
    }

    try {
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify(result.data)
      });
      alert('Libro guardado exitosamente');
      navigate('/catalogo');
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const parsedValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Alta de Libro</h2>
      {serverError && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{serverError}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input type="text" name="titulo" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Autor ID</label>
          <input type="number" name="autorId" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          {errors.autorId && <p className="text-red-500 text-sm mt-1">{errors.autorId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <input type="number" name="precio" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen URL</label>
          <input type="text" name="imagen" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Guardar Libro
        </button>
      </form>
    </div>
  );
}
