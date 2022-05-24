import { welcomeScreen } from "../render/renderWelcomePage.js";
import { RenderMain } from "../render/renderMain.js";

const logmeout = () => {
  localStorage.removeItem("currentUser");
  welcomeScreen.startScreen(RenderMain.mainpage);
};

export { logmeout };
