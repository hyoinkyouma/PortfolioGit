import { FetchWeather } from "../utils/fetchweather.js";
import { ReactAtHome, Styles } from "../utils/ReactAtHome.js";

const { renderer, selector } = new ReactAtHome();
const { style, append, create, onFocus, onHover } = renderer;

class Weather {
  static render = async (root) => {
    const weather = await FetchWeather.getWeather();
    const weatherDiv = create(
      "div",
      "weather",
      `display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      `
    );
    append(root, weatherDiv);

    //temperature
    const temp = create("h3", "temperature", Styles.h3 + "font-size: 1rem");
    temp.innerHTML = weather.temperature + " &#8451; " + weather.description;

    //location
    const loc = create("h3", "location", Styles.h3 + "font-size: 1.5rem");
    loc.textContent = weather.city;

    //icon
    const icon = create("img", "weather-con", "width: 100px");

    const weatherCode = weather.icon;
    const url = `http://openweathermap.org/img/wn/${weatherCode}@4x.png`;
    icon.setAttribute("src", url);

    append(weatherDiv, icon);
    append(weatherDiv, loc);
    append(weatherDiv, temp);

    return { weatherDiv, loc, temp, icon };
  };

  static updateWeather = async (root) => {
    const newWeather = await FetchWeather.getWeather();
    const interval = async () => {
      const {
        loc: locUpdate,
        temp: tempUpdate,
        icon: iconUpdate,
      } = await this.render(root);

      locUpdate.textContent = newWeather.city;
      tempUpdate.innerHTML =
        newWeather.temperature + " &#8451; " + newWeather.description;
      const newUrl = `http://openweathermap.org/img/wn/${newWeather.icon}@2x.png`;
      iconUpdate.setAttribute("src", newUrl);
    };
    setInterval(interval(), 1000 * 3600);
  };
}

export { Weather };
