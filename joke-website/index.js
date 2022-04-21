const jokeBtn = document.getElementById("joke-btn");
let joke = document.getElementById("joke");

const getJoke = async () => {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&type=single"
  );
  const jokeJson = await response.json();

  if (joke.innerText == jokeJson.joke) {
    getJoke();
  }

  joke.innerText = jokeJson.joke;
  console.log(jokeJson.joke);
};

const loading = async () => {
  joke.innerText = "Loading joke...";
  joke.classList.add("blinking");
  await getJoke();
  joke.classList.remove("blinking");
};

jokeBtn.addEventListener("click", loading);
