import type { Core } from "@strapi/strapi";

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async hello(ctx) {
    ctx.body = {
      message: "Hello from my plugin! 👋",
      timestamp: new Date().toISOString(),
      plugin: "copy-any-component",
    };
  },

  async greet(ctx) {
    const { name } = ctx.params;
    ctx.body = {
      message: `Merhaba, ${name}! 🎉`,
      timestamp: new Date().toISOString(),
    };
  },
});

export default controller;

