import { initNavigation } from "./navigation.js";
import { Router } from "./router.js";
import { initTheme } from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTheme();
  const router = new Router();
  router.init();
});
