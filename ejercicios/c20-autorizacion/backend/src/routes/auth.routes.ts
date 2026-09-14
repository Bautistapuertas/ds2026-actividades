import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { registroSchema, loginSchema } from "../validations/auth.validation";

const router = Router();
router.post("/registro", validate(registroSchema), authController.registrar);
router.post("/login", validate(loginSchema), authController.login);
router.get("/yo", authenticate, authController.yo);


import { authenticate } from "../middlewares/auth.middleware";
router.get('/yo', authenticate, async (req, res) => {
  try {
    const user = await prisma.usuario.findUnique({ where: { id: req.usuario?.id } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    const { password, ...usuarioSinPassword } = user;
    res.json(usuarioSinPassword);
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

export default router;

