import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible === "true" ? true : req.query.disponible === "false" ? false : undefined;
  const libros = await libroService.findAll(disponible);
  return res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const libro = await libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const libro = await libroService.update(Number(req.params.id), req.body);
  return res.json(libro);
}

export async function remove(req: Request, res: Response) {
  const ok = await libroService.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send();
}
