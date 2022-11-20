import dal from "./2-utils/dal";
dal.connect();
import sanitize from "./3-middleware/sanitize"
import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/utils-controller";
import config from "./2-utils/config";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";
import productController from "./6-controllers/product-controller";
import shopController from "./6-controllers/utils-controller";
import cartController from "./6-controllers/cart-controller";

const server = express();

// Allow cors
server.use(cors());
// Read the body json object
server.use(express.json());
// Serve static files
server.use('/static',express.static(__dirname + '/1-assets'))
// Sanitize tags from requests
server.use(sanitize)
// Auth requests
server.use("/api/auth", authController);
// Handle files
server.use(expressFileUpload())
// Products requests
server.use("/api/products", productController);
// Cart requests
server.use("/api/carts", cartController);
// All requests
server.use("/api", shopController);
// Route not found
server.use("*", routeNotFound);
// Catch all middleware
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
