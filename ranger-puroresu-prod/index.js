import { FetchWeather } from "./src/utils/fetchweather.js";
import { RenderMain } from "./src/render/renderMain.js";
import {
  welcomeScreen,
  loadingScreen,
} from "./src/render/renderWelcomePage.js";
import checkifmobile from "./src/checkifmobile.js";
const env = "prod";

if (env === "prod") {
  console.log = () => {};
}
//title
document.querySelector("title").innerHTML = "Momentum";

//if not yet logged in
const login = () => {
  loadingScreen.loadingPage(() => {
    welcomeScreen.startScreen(() => {
      RenderMain.mainpage();
    });
  });
};

//if user already logged in
const skipLogin = () => {
  loadingScreen.loadingPage(() => {
    RenderMain.mainpage();
  });
};

const app = () => {
  const isMobile = checkifmobile();
  console.log(isMobile);
  if (isMobile === true) return;
  FetchWeather.getWeather();
  const currentUser = window.localStorage.getItem("currentUser");
  if (currentUser === null) login();
  else skipLogin();
};

app();
