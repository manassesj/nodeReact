const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
