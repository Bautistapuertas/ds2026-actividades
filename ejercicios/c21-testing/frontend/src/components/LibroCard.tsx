import type { Libro } from "../types/libro";
import { Link } from "react-router-dom";

export function LibroCard({ libro }: { libro: Libro }) {
  return (
    <div className="border rounded p-4 shadow flex flex-col">
      <img src={libro.imagen} alt={libro.titulo} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold">{libro.titulo}</h2>
      <p className="text-gray-600">{libro.autor.nombre}</p>
      <p className="text-lg font-semibold mt-2">${libro.precio}</p>
      <div className="mt-auto pt-4">
        <Link to={`/libros/${libro.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center">
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
