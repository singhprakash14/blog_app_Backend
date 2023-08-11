const { connectToMongoDB } = require("./db/connection");
const colors = require("colors");
const express = require("express");

const userRoutes = require("./routes/user.route");
const blogRoutes = require("./routes/blog.route");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });

const app = express();

// for Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
const {
  handleRouteNotFound,
  errorHandler,
} = require("./middlwares/error-handler");

app.use(cors());
app.options("*", cors());

// for Parsing incoming JSON data
app.use(express.json());

// to Log HTTP requests in the console
app.use(morgan("dev"));

//app routes
app.use("/v1", userRoutes);
app.use("/v1", blogRoutes);

//error handlers
app.use(handleRouteNotFound);
app.use(errorHandler);

// for Starting the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port ${PORT}`.bgBlue);
});
