import { ReactAtHome, Styles } from "../utils/ReactAtHome.js";
import { fetchRequests } from "../utils/fetch.js";
import { Animations } from "../utils/animations.js";
import { Azthoth, loadingScreen, welcomeScreen } from "./renderWelcomePage.js";
import { Clock } from "../utils/clock.js";
import { PopulateModal } from "../utils/populateModal.js";
import { logmeout } from "../utils/logmeout.js";
import { Weather } from "./renderWeather.js";

const { renderer, selector } = new ReactAtHome();
const { style, append, create, onFocus, onHover } = renderer;

class Modals {
  //make modals function
  static makeModal = (name, cb) => {
    const container = selector.query(".container");
    const panel = create(
      "div",
      "memo-panel",
      `display: flex; align-items:center; opacity: 0; justify-content:center; flex-direction: column; background-color: #ffffff6b; width: 350px; height: 550px; position:fixed; bottom:6%; right:1%; border-radius: 20px;`
    );
    append(container, panel);

    const title = create(
      "h3",
      "modal-title",
      Styles.h3 + "text-align: center;"
    );
    append(panel, title);
    title.textContent = name;

    const itemsContainer = create(
      "div",
      "memos-container",
      Styles.container +
        "width: 300px; height: 400px; background-color:transparent;"
    );
    append(panel, itemsContainer);

    const items = create(
      "ul",
      "items",
      "display:flex; flex-direction:column; gap: 1rem; align-items: center; list-style:none; justify-content:flex-start; height: 350px;padding:0;"
    );
    append(itemsContainer, items);

    const input = create(
      "input",
      "btn-input",
      Styles.transparentInput +
        "width: 300px; position:relative; font-size: 1rem; height: 2rem; position: absolute; bottom: 34px;"
    );
    append(panel, input);
    const button = create(
      "button",
      "btn",
      Styles.btn +
        "border-radius: 0 20px 20px 0; position: absolute; bottom: 34px; right: 23px; height: 33px; border-radius: solid 1px black;"
    );
    button.innerHTML = "&#8627;";
    append(panel, button);

    return { panel, input, button, items };
  };
}

class RenderMain {
  static mainpage = async (cb) => {
    //get current user
    const userInfo = localStorage.getItem("currentUser");
    //reset dom
    Azthoth.destroyerOfWorlds();
    const container = selector.query(".container");

    //render weather
    const weather = Weather.updateWeather(container);

    //greeting
    const h3 = create("h3", "greeting", Styles.h3);
    append(container, h3);

    //time
    const h1 = create("h1", "time", Styles.h1);
    append(container, h1);
    const hours24 = Clock.render(h1);

    //greeting
    h3.textContent = `${
      hours24 >= 6 && hours24 <= 18 ? "Good Morning" : "Good Evening"
    } ${userInfo}`;

    //daily focus
    function focusInput() {
      const focusInput = create(
        "input",
        "focus-input",
        Styles.transparentInput
      );
      append(container, focusInput);
      focusInput.setAttribute("placeholder", "What will you do today?");
      onFocus(
        focusInput,
        `${Styles.transparentInput}  
        border: none;
        resize: none;
        outline: none;
        `
      );
      return focusInput;
    }

    const focus = focusInput();

    focus.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        Animations.addFocus(focus, () => {
          if (focus.value.length === 0) return;
          style(
            focus,
            `${Styles.transparentInput} 
                border: none;
                resize: none;
                outline: none;
                background-color: transparent;
                color: white;
                z-index: 1;
                font-size: 2.5rem;
                `
          );
          focus.value = "Today: " + focus.value;
          focus.setAttribute("disabled", true);
          var span = create(
            "span",
            "span",
            "z-index: 10; position: fixed; top: 50%; padding: 2rem 14rem; width: fit-content; height: fit-content;"
          );
          append(container, span);
          span.addEventListener("click", () => {
            focus.value = focus.value.replace("Today: ", "");
            focus.select();
            focus.removeAttribute("disabled");
            style(focus, Styles.transparentInput);
            span.remove();
          });
        });
      }
    });

    const qouteDiv = create(
      "div",
      "qoute-div",
      "position:absolute; bottom: 10%; display:flex; flex-direction:column; align-items:center; justify-content: flex-end;"
    );
    const qoute = create(
      "h4",
      "qoute",
      Styles.h3 + "font-size:1rem; font-weight:400;"
    );
    const qouteAuthor = create(
      "h5",
      "qoute",
      Styles.h3 + "font-size:1rem; font-weight: 400; margin:1rem;"
    );
    append(container, qouteDiv);
    append(qouteDiv, qoute);
    append(qouteDiv, qouteAuthor);
    const updateQoute = async () => {
      const qouteRes = await fetchRequests.getQoute();
      const text = qouteRes.text;
      const author = qouteRes.author === null ? "Unkown" : qouteRes.author;
      qoute.textContent = text;
      qouteAuthor.textContent = author;
    };
    setInterval(updateQoute, 60000);
    updateQoute();

    //Navbar
    const nav = create(
      "nav",
      "navbar",
      ` position: fixed;
        bottom: 0;
        background-color: #ffffff6b;
        height: 5%;
        width:100vw;
        display:flex;
        justify-content: right;
        align-items: center;
        gap: 1rem;
        `
    );
    append(container, nav);

    //NavItems

    //Logout button
    const logoutBtn = create(
      "button",
      "btn-logout",
      Styles.btnModal + "margin-right: auto;margin-left:1rem;"
    );
    logoutBtn.textContent = "Logout";
    onHover(
      logoutBtn,
      Styles.btnModalHover +
        "background-color: #FF6A74;" +
        "margin-right: auto;margin-left:1rem;",
      Styles.btnModal + "margin-right: auto; margin-left:1rem;"
    );
    logoutBtn.onclick = logmeout;
    append(nav, logoutBtn);

    //Todo list btn
    const navItemTodo = create(
      "button",
      "btn-todo",
      Styles.btnModal + "margin-right:1rem;"
    );
    navItemTodo.textContent = "Memo";
    onHover(
      navItemTodo,
      Styles.btnModalHover + "margin-right:1rem;",
      Styles.btnModal + "margin-right:1rem;"
    );
    append(nav, navItemTodo);

    //make todo list modal
    const {
      panel: panelMemo,
      input: inputMemo,
      button: buttonMemo,
      items: itemsMemo,
    } = Modals.makeModal("Memo");
    buttonMemo.setAttribute("disabled", true);
    inputMemo.setAttribute("disabled", true);

    //populate memo with data from mongo
    const updateModal = async () => {
      const memoArr = await PopulateModal.populateMemo(userInfo);
      await memoArr.forEach((memo) => {
        if (memo.isActive !== true) return;
        const item = create(
          "li",
          "item",
          "background-color: #ffffff6b; width: 250px; padding: 10px 20px; text-align:center; border-radius: 20px"
        );
        item.textContent = memo.entry;
        append(itemsMemo, item);
      });
    };

    await updateModal();

    //nav button handlers
    navItemTodo.addEventListener("click", async () => {
      if (panelMemo.style.opacity === "0") {
        budgetPanel.style.opacity = 0;
        buttonBudget.setAttribute("disabled", true);
        budgetInput.setAttribute("disabled", true);
        budgetPanel.style.zIndex = "0";
        panelMemo.style.zIndex = "10";
        buttonMemo.removeAttribute("disabled");
        inputMemo.removeAttribute("disabled");
        Animations.opacityAnim(panelMemo);
      } else {
        panelMemo.style.opacity = 0;
        panelMemo.style.zIndex = "0";
        buttonMemo.setAttribute("disabled", true);
        inputMemo.setAttribute("disabled", true);
      }
    });

    const navItemBudget = create(
      "button",
      "btn-budget",
      Styles.btnModal + "margin-right:1rem;"
    );
    onHover(
      navItemBudget,
      Styles.btnModalHover + "margin-right:1rem;",
      Styles.btnModal + "margin-right:1rem;"
    );

    ////////////WIP/////////////////
    //append(nav, navItemBudget);//
    //////////////////////////////

    navItemBudget.textContent = "Budget";

    //Budget modal
    const {
      panel: budgetPanel,
      input: budgetInput,
      button: buttonBudget,
      items: budgetItems,
    } = Modals.makeModal("Budget");
    buttonBudget.setAttribute("disabled", true);
    budgetInput.setAttribute("disabled", true);
    budgetInput.setAttribute("type", "number");

    //budgetModal eventhandler
    const addBudget = () => {
      if (budgetInput.value.length === 0) return;
      const item = create(
        "li",
        "item",
        "background-color: #ffffff6b; width: 250px; padding: 10px 20px; text-align:center; border-radius: 20px"
      );
      item.textContent = budgetInput.value;
      budgetInput.value = "";
      append(budgetItems, item);
    };
    buttonBudget.onclick = addBudget;
    budgetInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addBudget();
      }
    });

    //nav button handlers
    navItemBudget.addEventListener("click", () => {
      if (budgetPanel.style.opacity === "0") {
        panelMemo.style.opacity = 0;
        budgetPanel.style.zIndex = "10";
        budgetInput.removeAttribute("disabled");
        buttonBudget.removeAttribute("disabled");
        buttonMemo.setAttribute("disabled", true);
        inputMemo.setAttribute("disabled", true);
        Animations.opacityAnim(budgetPanel);
      } else {
        budgetPanel.style.zIndex = "0";
        budgetPanel.style.opacity = 0;
        buttonBudget.setAttribute("disabled", true);
        budgetInput.setAttribute("disabled", true);
      }
    });

    //Remove to do items
    const removetoDoItems = () => {
      const toDoItems = selector.queryAll(".item");
      toDoItems.forEach((item) => {
        item.onmouseover = () => {
          item.style.backgroundColor = "#FF6A74";
          item.style.transform = "scale(1.1)";
        };
        item.onmouseout = () => {
          item.style.backgroundColor = "#ffffff6b";
          item.style.transform = "scale(1)";
        };
        item.style.fontFamily = "sans-serif";
        item.title = "Double click to remove";

        item.addEventListener("dblclick", (e) => {
          const item = e.target;
          const user = userInfo;
          const memo = item.textContent;
          fetchRequests.removeMemo(user, memo);
          item.remove();
        });
      });
    };
    removetoDoItems();

    //buttonMemoHandler
    const addMemo = async () => {
      if (inputMemo.value.length === 0) return;
      const result = await fetchRequests.sendMemo(userInfo, inputMemo.value);
      const item = create(
        "li",
        "item",
        "background-color: #ffffff6b; width: 250px; padding: 10px 20px; text-align:center; border-radius: 20px"
      );
      item.textContent = inputMemo.value;
      inputMemo.value = "";
      append(itemsMemo, item);
      removetoDoItems();
      console.log(result);
    };
    buttonMemo.onclick = addMemo;
    inputMemo.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addMemo();
      }
    });

    //modal close on outside click
    container.addEventListener("click", (e) => {
      if (container !== e.target) return;
      budgetPanel.style.opacity = 0;
      buttonBudget.setAttribute("disabled", true);
      budgetInput.setAttribute("disabled", true);
      panelMemo.style.opacity = 0;
      buttonMemo.setAttribute("disabled", true);
      inputMemo.setAttribute("disabled", true);
    });
  };
}

export { RenderMain, Modals };
