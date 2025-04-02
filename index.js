const express = require("express");
const connected = require("./config/db");
const routes = require("./routes/userRoutes");
require("dotenv").config();


const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send({ status: 1, message: true });
});
app.use("/auth/user", routes);
app.listen(process.env.PORT, async () => {
  await connected();
  console.log(`server  runing  on port  http://localhost:${process.env.PORT}`);
});

module.exports = app
