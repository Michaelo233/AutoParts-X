import { Router } from "express";
import { myPartsController } from "../controllers/myPartsController";
import { validateUserId } from "../validations/myPartsValidation";

/**
 * @swagger
 * components:
 *   schemas:
 *     Part:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         partId:
 *           type: string
 *         partName:
 *           type: string
 *         categoryId:
 *           type: string
 *         partDescription:
 *           type: string
 *         partPrice:
 *           type: number
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         partImage:
 *           type: string
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *         isFavorite:
 *           type: boolean
 *         isForSale:
 *           type: boolean
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - userName
 *         - partsOwned
 *       properties:
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *         partsOwned:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Part"
 *     PartInput:
 *       type: object
 *       required:
 *         - partId
 *         - partName
 *         - categoryId
 *         - partImage
 *       properties:
 *         id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *         partId:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *         partName:
 *           type: string
 *         categoryId:
 *           type: string
 *         partDescription:
 *           type: string
 *         description:
 *           type: string
 *         partPrice:
 *           type: number
 *           minimum: 0
 *         price:
 *           type: number
 *           minimum: 0
 *         partImage:
 *           type: string
 *         isFavorite:
 *           type: boolean
 *         isForSale:
 *           type: boolean
 *       allOf:
 *         - anyOf:
 *             - required:
 *                 - partDescription
 *             - required:
 *                 - description
 *         - anyOf:
 *             - required:
 *                 - partPrice
 *             - required:
 *                 - price
 */
const myPartsRouter = Router();

/**
 * @swagger
 * /api/parts:
 *   get:
 *     summary: Get all parts
 *     tags: [My Parts]
 *     responses:
 *       200:
 *         description: Parts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Part"
 *       500:
 *         description: Unexpected server error.
 */
myPartsRouter.get("/", myPartsController.getAllParts);

/**
 * @swagger
 * /api/parts/users:
 *   get:
 *     summary: Get all users and their parts
 *     tags: [My Parts]
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
myPartsRouter.get("/users", myPartsController.getAllUsers);

/**
 * @swagger
 * /api/parts/users/{userId}/parts:
 *   get:
 *     summary: Get a user's parts by user ID
 *     tags: [My Parts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     responses:
 *       200:
 *         description: Parts retrieved successfully. Returns an empty array if the user has no parts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Part"
 *       400:
 *         description: Invalid user ID.
 *       500:
 *         description: Unexpected server error.
 */
myPartsRouter.get(
  "/users/:userId/parts",
  validateUserId,
  myPartsController.getPartsByUserId
);

/**
 * @swagger
 * /api/parts/users/{userId}:
 *   get:
 *     summary: Get a user by user ID
 *     tags: [My Parts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Invalid user ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Unexpected server error.
 */
myPartsRouter.get(
  "/users/:userId",
  validateUserId,
  myPartsController.getUserById
);

export default myPartsRouter;
