const memesHist = [];
const allowNsfw = false;
let isLoading = false;

const getMeme = () => {
  if (isLoading === false) {
    const memes = fetch("https://meme-api.herokuapp.com/gimme")
      .then((res) => res.json())
      .then((res) => {
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
    return memes;
  }
};

const checkIfUnique = async (param) => {
  if (memesHist.length === 0) return true;

  const title = param.title;
  let isUnique;
  memesHist.forEach((meme) => {
    if (meme.title === title) isUnique = false;
    else isUnique = true;
  });

  return isUnique;
};

const appendMemeToHist = (obj) => {
  memesHist.push(obj);
};

const diplayNewMeme = async () => {
  if ((await isLoading) === true) return;

  const memeObj = await getMeme();
  const isUnique = await checkIfUnique(memeObj);

  if (memeObj.isNSFW === allowNsfw) {
    if (isUnique === false) return;
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
document.onscroll = () => {
  if (
    window.scrollY === container.clientHeight - 715.5 ||
    window.scrollY + window.innerHeight === container.clientHeight ||
    window.scrollY + window.innerHeight === container.clientHeight + 0.5 ||
    window.scrollY + window.innerHeight === container.clientHeight - 0.5 ||
    container.scrollHeight - Math.round(container.scrollTop) ===
      container.clientHeight
  ) {
    initPage(50);
  }
};

const initPage = async (
  num,
  cb = () => {
    isLoading = false;
  }
) => {
  let x = 0;
  while (x < num) {
    await diplayNewMeme();
    x++;
  }
  cb();
};
initPage(50);
