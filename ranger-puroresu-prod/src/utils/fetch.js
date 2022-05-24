const APIURL = "https://ranger-puroresu.herokuapp.com";

class fetchRequests {
  static getImage = async () => {
    let imageJson;
    await fetch(APIURL + "/getImageBackground")
      .then((res) => res.json())
      .then((data) => (imageJson = data));
    return imageJson;
  };
  static sendUser = async (user) => {
    const req = async () => {
      const res = fetch(APIURL + "/sendUser", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ msg: user }),
      })
        .then((res) => res.json())
        .then((data) => data);

      return await res;
    };
    const res = await req();
    return res;
  };
  static getQoute = async () => {
    const result = await fetch(APIURL + "/getQoutes")
      .then((res) => res.json())
      .then((res) => res);
    return await result;
  };
  static sendMemo = async (user, memo) => {
    const result = await fetch(APIURL + "/sendMemo", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ memo: memo, user: user }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => console.log("Something went wrong \n" + e));

    return await result;
  };
  static removeMemo = async (user, memo) => {
    const result = await fetch(APIURL + "/deleteThis", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ memo: memo, user: user }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.error("failed to disable memo" + "\n" + e));
    return result;
  };
}
export { fetchRequests };
