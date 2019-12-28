const config = require("./context/config");
const seed = require("./context/seed");

function app() {
  config
    .createTable()
    .then(resolve => {
      console.log(resolve);
      return seed.fillData();
    })
    .then(resolve => console.log(resolve))
    .catch(err => console.log(err));
}

app();