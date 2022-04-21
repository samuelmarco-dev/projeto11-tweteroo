import express from "express";
import cors from "cors";
import chalk from "chalk";

const serverApp = express();
serverApp.use(cors());

serverApp.get();

serverApp.post();

serverApp.post();

serverApp.listen(5000);