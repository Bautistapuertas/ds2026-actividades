import express from "express";
import libroRoutes from "./routes/libro.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);

app.get("/", (_req, res) => {
 res.json({ mensaje: "API de la Librería" });
});

app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`Servidor en http://localhost:${PORT}`);
});
