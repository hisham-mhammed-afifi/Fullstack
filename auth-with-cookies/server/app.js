require("dotenv").config();
require("express-async-errors");

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const connect = require("./db/connect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/auth", authRouter);

app.use(errorHandlerMiddleware);

connect(app);
