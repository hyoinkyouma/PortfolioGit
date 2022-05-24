class PopulateModal {
  static populateMemo = async (user) => {
    const APIURL = "https://ranger-puroresu.herokuapp.com";

    const searchMongo = await fetch(APIURL + "/queryMemo", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: user }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return searchMongo;
  };
}

export { PopulateModal };
