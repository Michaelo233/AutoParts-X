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

/**
 * @swagger
 * components:
 *   schemas:
 *     UserNameInput:
 *       type: object
 *       required:
 *         - userName
 *       properties:
 *         userName:
 *           type: string
 *           minLength: 1
 *           example: Alex
 *     UserPartInput:
 *       allOf:
 *         - $ref: "#/components/schemas/PartInput"
 *         - type: object
 *           required:
 *             - userName
 *           properties:
 *             userName:
 *               type: string
 *               minLength: 1
 *               description: Required by request validation. The route userName is used to select the user.
 *     SaleStatusInput:
 *       type: object
 *       required:
 *         - isForSale
 *       properties:
 *         isForSale:
 *           type: boolean
 */
const userPartRouter = Router();

/**
 * @swagger
 * /api/addPart/users:
 *   get:
 *     summary: Get all users and their parts
 *     tags: [User Parts]
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.get("/users", userPartController.getAllUsers);

/**
 * @swagger
 * /api/addPart/users/by-name/{userName}:
 *   get:
 *     summary: Find a user by name
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: User name to find.
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid user name.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.get(
  "/users/by-name/:userName",
  validateUserNameParam,
  userPartController.getUserByName
);

/**
 * @swagger
 * /api/addPart/users:
 *   post:
 *     summary: Find or create a user by name
 *     tags: [User Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserNameInput"
 *     responses:
 *       200:
 *         description: Existing or newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: User name is required.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.post("/users", validateUserName, userPartController.getOrCreateUserByName);

/**
 * @swagger
 * /api/addPart/users/create:
 *   post:
 *     summary: Create a user by name
 *     tags: [User Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserNameInput"
 *     responses:
 *       201:
 *         description: User created. An existing user with the same name may be returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: User name is required.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.post(
  "/users/create",
  validateUserName,
  userPartController.createUser
);

/**
 * @swagger
 * /api/addPart/users/{userName}/parts:
 *   post:
 *     summary: Add a part to a user's inventory
 *     description: The request body also requires userName because of request validation; the path userName selects the user.
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserPartInput"
 *     responses:
 *       201:
 *         description: User with the updated inventory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid user name or part.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.post(
  "/users/:userName/parts",
  validateAddPart,
  userPartController.addPartToUser
);

/**
 * @swagger
 * /api/addPart/users/{userName}/listings:
 *   post:
 *     summary: Create a listing for a user
 *     description: The request body also requires userName because of request validation; the path userName selects the user.
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserPartInput"
 *     responses:
 *       201:
 *         description: Created listing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Part"
 *       400:
 *         description: Invalid user name or part.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.post(
  "/users/:userName/listings",
  validateAddPart,
  userPartController.addListingToUser
);

/**
 * @swagger
 * /api/addPart/users/{userName}/parts/{partId}:
 *   delete:
 *     summary: Remove a part from a user's inventory
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *       - in: path
 *         name: partId
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     responses:
 *       200:
 *         description: User with the updated inventory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid user name or part ID.
 *       404:
 *         description: Part not found for this user.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.delete(
  "/users/:userName/parts/:partId",
  validateRemovePartFromUser,
  userPartController.removePartFromUser
);

/**
 * @swagger
 * /api/addPart/users/{userName}/parts/{partId}/sale:
 *   patch:
 *     summary: Set whether a user's part is for sale
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *       - in: path
 *         name: partId
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SaleStatusInput"
 *     responses:
 *       200:
 *         description: User with the updated inventory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid sale status or path parameter.
 *       404:
 *         description: Part not found for this user.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.patch(
  "/users/:userName/parts/:partId/sale",
  validateTogglePartSaleStatus,
  userPartController.togglePartSaleStatus
);

/**
 * @swagger
 * /api/addPart/{id}:
 *   patch:
 *     summary: Update a part listing
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *         description: Listing ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PartInput"
 *     responses:
 *       200:
 *         description: Updated part listing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Part"
 *       400:
 *         description: Invalid listing ID or part data.
 *       404:
 *         description: Part not found.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.patch(
  "/:id",
  validateUpdatePart,
  userPartController.updatePart
);

/**
 * @swagger
 * /api/addPart/{partId}:
 *   delete:
 *     summary: Remove a part by ID
 *     tags: [User Parts]
 *     parameters:
 *       - in: path
 *         name: partId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Part ID.
 *     responses:
 *       200:
 *         description: Whether a part was removed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [removed]
 *               properties:
 *                 removed:
 *                   type: boolean
 *       400:
 *         description: Invalid part ID.
 *       404:
 *         description: Part not found.
 *       500:
 *         description: Unexpected server error.
 */
userPartRouter.delete(
  "/:partId",
  validatePartId,
  userPartController.removePartById
);

export default userPartRouter;
