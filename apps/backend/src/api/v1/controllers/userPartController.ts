import type { Request, Response } from "express";
import { userPartService } from "../services/userPartService";
import type { Part } from "../types/UserParts";

export const userPartController = {
  async getAllUsers(_req: Request, res: Response): Promise<void> {
    const users = await userPartService.getAllUsers();
    res.status(200).json(users);
  },

  async getUserByName(
    req: Request<{ userName: string }>,
    res: Response
  ): Promise<void> {
    const user = await userPartService.getUserByName(req.params.userName);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  },

  async getOrCreateUserByName(req: Request, res: Response): Promise<void> {
    const { userName } = req.body as { userName?: unknown };
    if (typeof userName !== "string" || !userName.trim()) {
      res.status(400).json({ error: "User name is required" });
      return;
    }

    const user = await userPartService.getOrCreateUserByName(userName);
    res.status(200).json(user);
  },

  async createUser(req: Request, res: Response): Promise<void> {
    const { userName } = req.body as { userName?: unknown };
    if (typeof userName !== "string" || !userName.trim()) {
      res.status(400).json({ error: "User name is required" });
      return;
    }

    const user = await userPartService.createUser(userName);
    res.status(201).json(user);
  },

  async addPartToUser(
    req: Request<{ userName: string }>,
    res: Response
  ): Promise<void> {
    const part = req.body as Part;
    if (!part || typeof part.partName !== "string") {
      res.status(400).json({ error: "Part name is required" });
      return;
    }

    const user = await userPartService.addPartToUser(
      req.params.userName,
      part
    );
    res.status(201).json(user);
  },

  async addListingToUser(
    req: Request<{ userName: string }>,
    res: Response
  ): Promise<void> {
    const part = req.body as Part;
    if (!part || typeof part.partName !== "string") {
      res.status(400).json({ error: "Part name is required" });
      return;
    }

    const listing = await userPartService.addListingToUser(
      req.params.userName,
      part
    );
    res.status(201).json(listing);
  },

  async removePartFromUser(
    req: Request<{ userName: string; partId: string }>,
    res: Response
  ): Promise<void> {
    const user = await userPartService.removePartFromUser(
      req.params.userName,
      req.params.partId
    );
    if (!user) {
      res.status(404).json({ error: "Part not found for this user" });
      return;
    }

    res.status(200).json(user);
  },

  async removePartById(
    req: Request<{ partId: string }>,
    res: Response
  ): Promise<void> {
    const removed = await userPartService.removePartById(req.params.partId);
    if (!removed) {
      res.status(404).json({ error: "Part not found" });
      return;
    }

    res.status(200).json({ removed });
  },

  async updatePart(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    const part = await userPartService.updatePart({
      ...(req.body as Part),
      id: req.params.id,
    });
    if (!part) {
      res.status(404).json({ error: "Part not found" });
      return;
    }

    res.status(200).json(part);
  },

  async togglePartSaleStatus(
    req: Request<{ userName: string; partId: string }>,
    res: Response
  ): Promise<void> {
    const { isForSale } = req.body as { isForSale?: unknown };
    if (typeof isForSale !== "boolean") {
      res.status(400).json({ error: "isForSale must be a boolean" });
      return;
    }

    const user = await userPartService.togglePartSaleStatus(
      req.params.userName,
      req.params.partId,
      isForSale
    );
    if (!user) {
      res.status(404).json({ error: "Part not found for this user" });
      return;
    }

    res.status(200).json(user);
  },
};
