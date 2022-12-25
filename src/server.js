const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware");
const port = process.env.PORT || 4000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
app.use(bodyParser.json());
const Router = require("./routes/routes");

app.use("/api", Router);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`starting app on: ${port}`);
});
