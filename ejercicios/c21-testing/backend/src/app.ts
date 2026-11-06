import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API Librería UTN DS26 - Actividad C23",
    version: "1.0.3",
    estado: "online",
    endpoints: {
      libros: "/api/libros",
      auth: "/api/auth"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);

app.use(errorHandler);

export default app;
