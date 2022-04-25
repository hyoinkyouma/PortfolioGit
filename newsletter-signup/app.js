const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const path = require("path");
const { json } = require("express/lib/response");

//Mailchimp
//api key
//248675f79100a1c9b71f35f22d65a5e0-us14
//list Id
//ff35c83c20

//Constructor for new members
function Person(name, age, email, number) {
  this.members = [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        AGE: age,
        PHONE: number,
      },
    },
  ];
}

app.use(express.static(path.join(__dirname, "..")));
console.log(path.join(__dirname, "../"));

app.use(bodyParser.urlencoded({ extended: true }));

//Send sign up page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

//Post request
app.post("/", (req, res) => {
  //create new person
  const user = new Person(
    req.body.name,
    Number(req.body.age),
    req.body.email,
    Number(req.body.number)
  );

  //Turn person array into flatpack json
  const jsonData = JSON.stringify(user);

  //API key
  apiKey = "248675f79100a1c9b71f35f22d65a5e0-us14";

  //My list ID for mailchimp audience
  const listID = "ff35c83c20";

  // mail chimp url
  const url = `https://us14.api.mailchimp.com/3.0/lists/${listID}`;

  //options for http request
  const options = {
    method: "POST",
    auth: "roman:248675f79100a1c9b71f35f22d65a5e0",
  };

  //API request
  const request = https.request(url, options, (response) => {
    if (response.statusCode == 200) {
      res.sendFile(path.join(__dirname, "/success.html"));
    } else {
      res.sendFile(path.join(__dirname, "failure.html"));
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, () => console.log("Listening on Port 3000"));

//api key
//248675f79100a1c9b71f35f22d65a5e0-us14
//list Id
//ff35c83c20
