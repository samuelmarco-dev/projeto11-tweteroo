import express, {json} from "express";
import cors from "cors";

import { postSignUp, getTweets, postTweets, getTweetsUsuario } from "./controllers.js";

const serverApp = express();
serverApp.use(cors());
serverApp.use(json());

serverApp.post('/sign-up', postSignUp);

serverApp.post('/tweets', postTweets);

serverApp.get('/tweets', getTweets);

serverApp.get('/tweets/:idUsuario', getTweetsUsuario);

serverApp.listen(5000);