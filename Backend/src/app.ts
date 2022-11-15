import dal from "./2-utils/dal";
dal.connect();
import sanitize from "./3-middleware/sanitize"
import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/shop-controller";
import config from "./2-utils/config";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";

const server = express();

// Allow cors
server.use(cors());
// Read the body json object
server.use(express.json());
// Serve static files
server.use('/static',express.static('src/1-assets'))
// Sanitize tags from requests
server.use(sanitize)
// Auth
server.use("/api/auth", authController);
// Handle files
server.use(expressFileUpload())
// All requests
server.use("/api", controller);
// Route not found
server.use("*", routeNotFound);
// Catch all middleware
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
