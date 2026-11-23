import type { Request, Response } from "express";
import { myPartsService } from "../services/myPartsService";

export const myPartsController = {
  async getAllUsers(_req: Request, res: Response): Promise<void> {
    const users = await myPartsService.getAllUsers();
    res.status(200).json(users);
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await myPartsService.getUserById(req.params.userId as string);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  },

  async getPartsByUserId(req: Request, res: Response): Promise<void> {
    const parts = await myPartsService.getPartsByUserId(req.params.userId as string);
    res.status(200).json(parts);
  },

  async getAllParts(_req: Request, res: Response): Promise<void> {
    const parts = await myPartsService.getAllParts();
    res.status(200).json(parts);
  },
};
