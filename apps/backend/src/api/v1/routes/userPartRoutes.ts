import { Router } from "express";
import { userPartController } from "../controllers/userPartController";
import {
  validateAddPart,
  validatePartId,
  validateRemovePartFromUser,
  validateTogglePartSaleStatus,
  validateUpdatePart,
  validateUserName,
  validateUserNameParam,
} from "../validations/userPartValidation";

const userPartRouter = Router();

userPartRouter.get("/users", userPartController.getAllUsers);
userPartRouter.get(
  "/users/by-name/:userName",
  validateUserNameParam,
  userPartController.getUserByName
);
userPartRouter.post("/users", validateUserName, userPartController.getOrCreateUserByName);
userPartRouter.post(
  "/users/create",
  validateUserName,
  userPartController.createUser
);
userPartRouter.post(
  "/users/:userName/parts",
  validateAddPart,
  userPartController.addPartToUser
);
userPartRouter.post(
  "/users/:userName/listings",
  validateAddPart,
  userPartController.addListingToUser
);
userPartRouter.delete(
  "/users/:userName/parts/:partId",
  validateRemovePartFromUser,
  userPartController.removePartFromUser
);
userPartRouter.patch(
  "/users/:userName/parts/:partId/sale",
  validateTogglePartSaleStatus,
  userPartController.togglePartSaleStatus
);
userPartRouter.patch(
  "/:id",
  validateUpdatePart,
  userPartController.updatePart
);
userPartRouter.delete(
  "/:partId",
  validatePartId,
  userPartController.removePartById
);

export default userPartRouter;
