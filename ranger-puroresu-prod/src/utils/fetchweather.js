class FetchWeather {
  static getWeather = async () => {
    const APIURL = "https://ranger-puroresu.herokuapp.com";

    const weatherData = await fetch(`${APIURL}/weatherData`).then((res) =>
      res.json()
    );

    return weatherData;
  };
}

export { FetchWeather };
