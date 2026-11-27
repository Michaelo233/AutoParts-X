import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import corsOptions from "../config/cors";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import myPartsRoutes from "./api/v1/routes/myPartsRoutes";
import userPartRoutes from "./api/v1/routes/userPartRoutes";
import allProductRoutes from "./api/v1/routes/allProductRoutes";
import productRoutes from "./api/v1/routes/productRoutes";

// initialize express application
const app: Express = express();

// allow use of .env variables
dotenv.config();
// add morgan middleware, combined format logs info about each HTTP request
app.use(morgan("combined"));

// allow express to parse json
app.use(express.json({ limit: "8mb" }));

// add Cross-Origin Resource Sharing middleware
// This will refuse requests from origins that donot fulfill corsOptions requirements
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
app.use(cors(corsOptions));

// invoke swagger middleware for serving docs in /api-docs
setupSwagger(app);

// listen for requests on root and send simple text response
app.get("/", (_req, res) => {
    res.send("Got response from backend!");
});

app.use("/api/parts", myPartsRoutes);
app.use("/api/addPart", userPartRoutes);
app.use("/api/allProducts", allProductRoutes);
app.use("/api/v1/products", productRoutes);

//errorhandler catches errors as last element in middleware chain
// occurs when "next" is invoked
app.use(errorHandler);

export default app;