import dal from "./2-utils/dal";
dal.connect();
import { Server as HttpServer} from "http";
import sanitize from "./3-middleware/sanitize"
import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import config from "./2-utils/config";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";
import productController from "./6-controllers/product-controller";
import cartController from "./6-controllers/cart-controller";
import utilsController from "./6-controllers/utils-controller";
import cartLogic from "./5-logic/cart-logic";

const expressServer = express();

// Allow cors
expressServer.use(cors());
// Read the body json object
expressServer.use(express.json());
// Serve static files
expressServer.use('/static',express.static(__dirname + '/1-assets'))
// Sanitize tags from requests
expressServer.use(sanitize)
// Auth requests
expressServer.use("/api/auth", authController);
// Handle files
expressServer.use(expressFileUpload())
// All requests
expressServer.use("/api", utilsController);
// Products requests
expressServer.use("/api/products", productController);
// Cart requests
expressServer.use("/api/carts", cartController);
// Route not found
expressServer.use("*", routeNotFound);
// Catch all middleware
expressServer.use(catchAll);

expressServer.listen(config.port, () => console.log("Listening on http://localhost:" + config.port))

// todo - remove socket if not in use
// const httpServer: HttpServer = expressServer.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));

// cartLogic.cartSocket(httpServer)