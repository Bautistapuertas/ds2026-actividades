import express from "express";
import libroRoutes from "./routes/libro.routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/libros", libroRoutes);

app.get("/", (_req, res) => {
 res.json({ mensaje: "API de la Librería" });
});

app.listen(PORT, () => {
 console.log(`Servidor en http://localhost:${PORT}`);
});
