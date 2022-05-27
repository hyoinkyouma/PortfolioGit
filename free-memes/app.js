const memesHist = [];
const allowNsfw = false;

const getMeme = () => {
  const memes = fetch("https://meme-api.herokuapp.com/gimme")
    .then((res) => res.json())
    .then(
      (res) =>
        (data = {
          url: res.url,
          title: res.title,
          author: res.author,
          isNSFW: res.nsfw,
          postLink: res.postLink,
        })
    )
    .catch((e) => {
      console.log(e);
    });
  return memes;
};

const checkIfUnique = async (param) => {
  if (memesHist.length === 0) return true;

  const objUrl = await param.url;
  let isUnique;
  memesHist.forEach((meme) => {
    if (meme.url === objUrl) isUnique = false;
    else isUnique = true;
  });

  return isUnique;
};

const appendMemeToHist = (obj) => {
  memesHist.push(obj);
};

const diplayNewMeme = async () => {
  const memeObj = await getMeme();
  const isUnique = await checkIfUnique(memeObj);

  if (memeObj.isNSFW === allowNsfw) {
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

let isLoading = false;
const container = document.querySelector(".container");
document.onscroll = () => {
  if (
    window.scrollY === container.clientHeight - 715.5 ||
    window.scrollY + window.innerHeight === container.clientHeight ||
    window.scrollY + window.innerHeight === container.clientHeight + 0.5 ||
    window.scrollY + window.innerHeight === container.clientHeight - 0.5
  ) {
    if (isLoading === false) {
      isLoading === true;
      initPage(50);
    }
  }
};

const initPage = (num) => {
  let x = 0;
  while (x < num) {
    diplayNewMeme();
    x++;
  }
  isLoading = false;
};
initPage(50);
