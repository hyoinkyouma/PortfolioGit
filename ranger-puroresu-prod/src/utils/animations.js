import { Styles } from "./ReactAtHome.js";
class Animations {
  static loadingBar = (inputFieldName, cb) => {
    let width = 5;
    inputFieldName.style = Styles.transparentInput + "width: 0;";
    const frame = () => {
      if (width >= 30) {
        clearInterval(id);
        inputFieldName.setAttribute("disabled", "true");
        inputFieldName.setAttribute("placeholder", "Success");
        cb();
      } else {
        width++;
        inputFieldName.style.width = `${width}%`;
      }
    };
    let id = setInterval(frame, 16);
  };

  //adds animation to focus input
  static addFocus = (focus, cb) => {
    let width = 30;
    const frame = () => {
      if (width === 20) {
        clearInterval(id);
        cb();
        focus.style.width = "30%";
      } else {
        width = width - 5;
        focus.style.width = width + "%";
      }
    };
    let id = setInterval(frame, 16);
  };

  static loadingText = (loadingText, url, cb) => {
    //url for background image
    var img = new Image();
    img.src = url;
    let text = "Loading";
    loadingText.textContent = text;

    //img on load ends loading animation
    img.onload = () => {
      clearInterval(id);
      cb();
    };

    //number of periods var
    let periods = 0;

    const frame = () => {
      if (periods < 3) {
        text += ".";
        loadingText.textContent = text;
        periods++;
      } else {
        text = "Loading";
        loadingText.textContent = text;
        periods = 0;
      }
    };

    let id = setInterval(frame, 250);
  };

  static opacityAnim = (elem) => {
    let x = 0;
    const memoModalAnim = () => {
      if (x < 1) {
        x += 0.1;
        elem.style.opacity = x;
      } else {
        clearInterval(id);
      }
    };
    let id = setInterval(memoModalAnim, 16);
  };
}

export { Animations };
