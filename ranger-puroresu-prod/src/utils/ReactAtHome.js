//You: Mom I want react.js
//Mom: We have react.js at home
//React.js at home:  this.

class ReactAtHome {
  selector = {
    query: (query) => {
      return document.querySelector(query);
    },
    queryAll: (query) => {
      return document.querySelectorAll(query);
    },
  };
  renderer = {
    onHover: (element, style, defStyle) => {
      element.addEventListener("mouseover", () => {
        element.style = style;
      });
      element.addEventListener("mouseout", () => {
        element.style = defStyle;
      });
    },
    onFocus: (element, style) => {
      element.addEventListener("focus", () => {
        element.style = style;
      });
    },
    create: (newElement, elemClass = "generated", style = "display:none;") => {
      const elem = document.createElement(newElement);
      elem.classList.add(elemClass);
      elem.style = style;
      return elem;
    },
    style: (element, styles) => {
      element.style = styles;
    },
    append: (appendTo, elementToAppend) => {
      appendTo.append(elementToAppend);
    },
  };
}

class Styles {
  static mobile = window.matchMedia("(max-width: 900px)");

  static container = `
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    ${
      this.mobile.matches === true
        ? "background-size: cover;"
        : "background-size: cover;"
    };
    `;
  static h1 = `
  ${this.reset};
    color:white;
    font-family: sans-serif;
    font-size: 4rem;
    text-shadow: 2px 2px #10000000;
    ${this.mobile.matches === true ? "text-align:center;" : ";"};
    `;
  static transparentInput = `
    background-color: #ffffff6b;
    border: none;
    text-align: center;
    color: black;
    font-size: 2rem;
    border-radius: 20px 20px;
    ${this.mobile.matches === true ? "width: 50%;" : "width: 30%;"};
    box-shadow: 20px 0px 20px 20px  #10000000;
    min-height: 2rem;
  `;
  static btn = `
    background-color: #ffffff6b;
    border:none;
    padding: .5rem 1rem;
    font-size: 1rem;
    border-radius: 20px 20px;
  `;
  static btnHover = `
    ${this.btn};
    background-color: #fff;
    cursor: pointer;
  `;
  static opacityZero = `
    opacity: 0;
  `;
  static reset = `
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  `;
  static h3 = `
  color:white;
  font-family: sans-serif;
  font-size: 3rem;
  ${this.reset}
  ${this.mobile.matches === true ? "text-align:center;" : ";"}
  
  `;
  static btnModal = `
  ${Styles.btn} 
  height: 2rem; 
  width: 5rem; 
  display:flex; 
  align-items:center;
  justify-content:center;
  `;
  static btnModalHover = `
  ${Styles.btnHover};
  height: 2rem; 
  width: 5rem; 
  display:flex; 
  align-items:center;
  justify-content:center;`;
}

export { ReactAtHome, Styles };
