import { Libro } from "../types/libro.types";
const libros: Libro[] = [
 { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://example.com/1", disponible: true },
 { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 5000, imagen: "https://example.com/2", disponible: false },
 { id: 3, titulo: "1984", autor: "George Orwell", precio: 4000, imagen: "https://example.com/3", disponible: true }
];
let proximoId = 4;

export function findAll(disponible?: boolean): Libro[] {
 if (disponible === undefined) return libros;
 return libros.filter(l => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
 return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
 const nuevo: Libro = { id: proximoId++, ...datos };
 libros.push(nuevo);
 return nuevo;
}

export function update(id: number, datos: Partial<Omit<Libro, "id">>): Libro | undefined {
 const idx = libros.findIndex(l => l.id === id);
 if (idx === -1) return undefined;
 libros[idx] = { ...libros[idx], ...datos };
 return libros[idx];
}

export function remove(id: number): boolean {
 const idx = libros.findIndex(l => l.id === id);
 if (idx === -1) return false;
 libros.splice(idx, 1);
 return true;
}
