import activities from "./activities/_module.mjs";
import models from "./models/_module.mjs";
import sheets from "./sheets/_module.mjs";

globalThis.MORE_ACTIVITIES = {
  activities,
  models,
  sheets
};

Hooks.once("init", () => {
  for (const activity of Object.values(activities)) {
    CONFIG.DND5E.activityTypes[activity.metadata.type] = {
      documentClass: activity
    };
  }
});
