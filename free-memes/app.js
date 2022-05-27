const memesHist = [];
const allowNsfw = false;
let isLoading = false;

const getMeme = async () => {
  const memes = fetch("https://meme-api.herokuapp.com/gimme")
    .then((res) => res.json())
    .then((res) => {
      isLoading = false;
      return (data = {
        url: res.url,
        title: res.title,
        author: res.author,
        isNSFW: res.nsfw,
        postLink: res.postLink,
      });
    })
    .catch((e) => {
      console.log(e);
    });
  return await memes;
};
const checkIfUnique = async (param) => {
  if (memesHist.length === 0) return true;
  else {
    const title = param.title;
    let isUnique;
    memesHist.forEach((meme) => {
      if (meme.title === title) isUnique = false;
      else isUnique = true;
    });

    return isUnique;
  }
};

const appendMemeToHist = (obj) => {
  memesHist.push(obj);
};

const diplayNewMeme = async () => {
  if (isLoading === true) return;
  isLoading = true;

  const memeObj = await getMeme();
  const isUnique = await checkIfUnique(memeObj).then(isLoading === false);

  if (memeObj.isNSFW === false) {
    if (isUnique === true) {
      appendMemeToHist(memeObj);

      const memesContainer = document.querySelector(".memes-container");
      const img = document.createElement("img");
      const title = document.createElement("h3");
      const author = document.createElement("h5");
      const anchor = document.createElement("a");
      const memeDiv = document.createElement("div");
      const titleDiv = document.createElement("div");

      anchor.setAttribute("href", memeObj.postLink);
      anchor.setAttribute("target", "_blank");

      memeDiv.classList.add("meme");
      titleDiv.classList.add("meme-title");

      img.setAttribute("src", memeObj.url);
      title.textContent = memeObj.title;
      author.textContent = memeObj.author;

      titleDiv.append(title, author);
      anchor.append(titleDiv, img);
      memeDiv.append(anchor);

      img.addEventListener("load", () => {
        memesContainer.append(memeDiv);
      });

      img.addEventListener("error", () => {
        memeDiv.remove();
      });
    }
  }
};

const container = document.querySelector(".container");
document.onscroll = async () => {
  console.log(
    container.clientHeight + window.innerHeight,
    window.outerHeight + window.scrollY
  );
  if (
    container.clientHeight + window.innerHeight <=
      window.outerHeight + window.scrollY + 1000 ||
    container.clientHeight + window.innerHeight <=
      window.outerHeight + window.scrollY - 1000
  ) {
    if (isLoading === false) {
      console.log("...");
      initPage(50);
    }
  }
};
const initPage = async (num) => {
  let x = 0;
  if (isLoading === false) {
    while (x < num) {
      await diplayNewMeme();
      x++;
    }
  }
};
initPage(50);
