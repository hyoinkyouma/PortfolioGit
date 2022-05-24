const checkifmobile = () => {
  const isPhone = window.matchMedia("(max-width: 570px)").matches;
  if (isPhone === true) {
    window.location = "./nophone.html";
  }
  return isPhone;
};

export default checkifmobile;
