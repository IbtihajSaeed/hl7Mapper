import express from "express";
import dotenv from "dotenv";
import registerRoutes from "../api_source/routes/index.js";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: `http://${process.env.DOMAIN}:${process.env.PORT || 8080}`,
};
dotenv.config({ path: "../../.env" });
const server = async () => {
  try {
    app.use(cors(corsOptions));
    const port = process.env.PORT || 5000;

    app.use(express.json());
    registerRoutes(app);
    app.listen(port, () => {
      console.log("Server is running is port: " + port);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

server();
