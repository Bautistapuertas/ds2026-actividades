import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Libro {
 id: number; titulo: string; autor: string; precio: number; imagen: string; disponible: boolean;
}

const libros: Libro[] = [
 { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://example.com/1", disponible: true },
 { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 5000, imagen: "https://example.com/2", disponible: false },
 { id: 3, titulo: "1984", autor: "George Orwell", precio: 4000, imagen: "https://example.com/3", disponible: true }
];

app.get("/api/libros", (req, res) => {
 res.json(libros);
});

app.get("/", (_req, res) => {
 res.json({ mensaje: "API de la Librería" });
});

app.listen(PORT, () => {
 console.log(`Servidor en http://localhost:${PORT}`);
});
