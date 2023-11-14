import hl7Route from "./hl7Route.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const routes = [
  {
    path: `${process.env.BASE_API}/ping`,
    route: hl7Route,
  },
];

const registerRoutes = (app) =>
  routes.forEach((route) => {
    app.use(route.path, route.route);
  });

export default registerRoutes;
