import { Router } from "express";
import { myPartsController } from "../controllers/myPartsController";
import { validateUserId } from "../validations/myPartsValidation";

const myPartsRouter = Router();

myPartsRouter.get("/", myPartsController.getAllParts);
myPartsRouter.get("/users", myPartsController.getAllUsers);
myPartsRouter.get(
  "/users/:userId/parts",
  validateUserId,
  myPartsController.getPartsByUserId
);
myPartsRouter.get(
  "/users/:userId",
  validateUserId,
  myPartsController.getUserById
);

export default myPartsRouter;
