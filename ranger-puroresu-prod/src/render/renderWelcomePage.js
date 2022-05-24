import { ReactAtHome, Styles } from "../utils/ReactAtHome.js";
import { fetchRequests } from "../utils/fetch.js";
import { Animations } from "../utils/animations.js";

const { renderer, selector } = new ReactAtHome();
const { style, append, create, onFocus, onHover } = renderer;

class welcomeScreen {
  static capitalizeFLetter = (string) => {
    const stringLower = string.toLowerCase();
    return stringLower.charAt(0).toUpperCase() + stringLower.slice(1);
  };

  static startScreen = async (cb) => {
    //clear dom
    Azthoth.destroyerOfWorlds();
    //container
    const container = selector.query("div");

    //Greeting
    const h1 = create("h1", "welcomeString");
    h1.textContent = "Welcome!";
    style(h1, Styles.h1);
    append(container, h1);

    //name input
    const inputFieldName = create("input");
    inputFieldName.setAttribute("placeholder", "What's your name?");
    style(inputFieldName, Styles.transparentInput);
    onFocus(inputFieldName, `${Styles.transparentInput} outline: none;`);
    append(container, inputFieldName);

    //login
    const loginBtn = create("button");
    loginBtn.textContent = "Login";
    style(loginBtn, Styles.btn + "margin-top: 1rem;");
    onHover(
      loginBtn,
      Styles.btnHover + "margin-top: 1rem;",
      Styles.btn + "margin-top: 1rem;"
    );
    append(container, loginBtn);

    //event handler login btn
    const login = async () => {
      if (inputFieldName.value.length === 0) {
        inputFieldName.setAttribute("placeholder", "Give me a name man.");
      } else {
        const inputName = this.capitalizeFLetter(inputFieldName.value);
        console.log(inputName);
        const payload = inputName;
        const found = await fetchRequests.sendUser(payload);
        inputFieldName.value = "";
        inputFieldName.setAttribute("placeholder", "");
        loginBtn.setAttribute("disabled", "true");
        Animations.loadingBar(inputFieldName, cb);
        window.localStorage.setItem("currentUser", found.name);
        loadingScreen.userInfo = window.localStorage.getItem("currentUser");
      }
    };
    loginBtn.addEventListener("click", async () => {
      await login();
    });
    inputFieldName.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") await login();
    });
  };
}

class loadingScreen {
  static userInfo = window.localStorage.getItem("currentUser");
  static renderImage = async (body, url) => {
    style(
      body,
      `
      ${Styles.container}
      background-image: url("${url}")
      `
    );
  };

  static loadingPage = async (cb) => {
    const body = selector.query("body");

    const div = create("div", "container");

    const head = selector.query("head");
    const styletag = create("style");
    append(head, styletag);
    styletag.innerHTML = `
    input::placeholder {
        color: rgb(38, 38, 38);
        font-size: 1.7rem;
      }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }
    input[type=number] {
        -moz-appearance: textfield;
        }

      `;

    style(
      body,
      `
      ${Styles.reset}
      background-color: black;`
    );
    append(body, div);
    style(div, Styles.container);

    Azthoth.destroyerOfWorlds();

    const updateBackground = async () => {
      const url = await GenerateImages.getImageUrl();
      this.renderImage(div, url);
      return url;
    };

    const id = setInterval(updateBackground, 1000 * 160);

    const url = await updateBackground();

    //PARALLAX EFFECT BG
    const allElems = selector.query("body");

    allElems.addEventListener("mousemove", (e) => {
      let originalBGPOS = { x: 50, y: 50 };
      originalBGPOS.x -= -e.offsetX * 0.005;
      originalBGPOS.y -= -e.offsetY * 0.005;
      div.style.backgroundPositionX = originalBGPOS.x + "%";
      div.style.backgroundPositionY = originalBGPOS.y + "%";
      originalBGPOS.x += -e.offsetX * 0.005;
      originalBGPOS.y += -e.offsetY * 0.005;
    });

    const h1 = create("h1");
    style(h1, Styles.h1 + "position:fixed");
    append(div, h1);
    Animations.loadingText(h1, url, cb);
  };
}

class Azthoth {
  //reset dom
  static destroyerOfWorlds = (
    cb = () => {
      const allElems = document.querySelectorAll("*:not(div)");
      allElems.forEach((elem) => {
        elem.style = `
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      `;
      });
    }
  ) => {
    try {
      cb();
      const div = selector.query("div");
      div.innerHTML = "";
    } catch (e) {
      console.error("Cannot Reset Dom \n" + e);
    }
  };
}

class GenerateImages {
  static getImageUrl = async () => {
    const randomImageRef = () => Math.floor(Math.random() * 30);
    const imageJson = await fetchRequests.getImage();
    console.log(imageJson.photos[randomImageRef()]);
    return imageJson.photos[randomImageRef()].src.original;
  };
}

export { welcomeScreen, GenerateImages, Azthoth, loadingScreen };
