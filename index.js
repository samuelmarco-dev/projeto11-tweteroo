import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";

const serverApp = express();
serverApp.use(cors());
serverApp.use(json());

let [ arrayUsuarios, arrayTweets ] = [[ ], [ ]];

/* 
Users
{
	username: 'bobesponja', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
}

Tweets
{
	username: "bobesponja",
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  tweet: "eu amo o hub",
}
*/
serverApp.post('/sign-up', (req, res)=>{
    const { username, avatar } = req.body;
    
    console.log(chalk.green(username, avatar));
    console.log("arr", arrayUsuarios);
    
    const verificarLogin = arrayUsuarios.find((usuario) => { 
        return usuario.username === username || usuario.avatar === avatar
    });
    
    console.log("find", verificarLogin);
    
    if(verificarLogin !== undefined){
        res.send('Usuário já existe');
    }
    if(verificarLogin === undefined){
        arrayUsuarios.push({username, avatar});
        res.send('OK');
    }

    console.log("arr", arrayUsuarios);
});

// serverApp.post();

// serverApp.get();

serverApp.listen(5000);