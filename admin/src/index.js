import { PLUGIN_ID } from "./pluginId";
import { PluginIcon } from "./components/PluginIcon";

export default {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "Copy Any Component",
      },
      Component: async () => {
        const component = await import("./pages/HomePage");
        return component.default;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      isReady: true,
      name: PLUGIN_ID,
    });
  },
  bootstrap() {},
};

