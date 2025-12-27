import controllers from "./controllers";
import routes from "./routes";

export default {
  register({ strapi }) {
    // Register plugin
  },
  bootstrap({ strapi }) {
    strapi.log.info("🚀 My Simple Plugin loaded successfully!");
  },
  controllers,
  routes,
};
