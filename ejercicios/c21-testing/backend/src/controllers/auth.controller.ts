import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function registrar(req: Request, res: Response) {
  try {
    const usuario = await authService.registrar(req.body);
    return res.status(201).json(usuario);
  } catch (err: any) {
    console.error("Error en registrar:", err);
    return res.status(500).json({ error: err.message || "Error interno del servidor" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const resultado = await authService.login(req.body);
    if (!resultado) return res.status(401).json({ error: "Credenciales inválidas" });
    return res.json(resultado);
  } catch (err: any) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: err.message || "Error interno del servidor" });
  }
}

export async function yo(req: Request, res: Response) {
  try {
    const usuario = await authService.findById(req.usuario!.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.json(usuario);
  } catch (err: any) {
    console.error("Error en yo:", err);
    return res.status(500).json({ error: err.message || "Error interno del servidor" });
  }
}
