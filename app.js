require('dotenv').config({ path: './envs/.env.example' }); 

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/contactsRoutes");
const { serverConfig } = require('./configs/serverConfig');

const app = express();

mongoose
  .connect(serverConfig.dbPass)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

//--------middleware-----------
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = serverConfig.port;
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
