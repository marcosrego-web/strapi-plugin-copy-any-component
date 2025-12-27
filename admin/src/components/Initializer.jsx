import { useEffect, useRef } from "react";
import { PLUGIN_ID } from "../pluginId";

const Initializer = ({ setPlugin }) => {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current && setPlugin) {
      try {
        setPlugin({ id: PLUGIN_ID, isReady: true });
        ref.current = true;
      } catch (error) {
        console.error("Plugin initializer error:", error);
      }
    }
  }, [setPlugin]);

  return null;
};

export { Initializer };

