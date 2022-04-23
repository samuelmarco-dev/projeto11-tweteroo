let [ arrayUsuarios, arrayTweets ] = [[ ], [ ]];

function postSignUp(req, res){
    const { username, avatar } = req.body;

    if(username.length === 0 || avatar.length === 0){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    
    const verificarLogin = arrayUsuarios.find((usuario) => { 
        return usuario.username === username || usuario.avatar === avatar
    });
    
    if(verificarLogin !== undefined){
        res.status(422).send("Usuário ou foto de perfil já foram cadastrados!");
    }
    if(verificarLogin === undefined){
        arrayUsuarios.push({username, avatar});
        res.status(201).send('OK');
    }
}

function postTweets(req, res){
    const { username, tweet } = req.body;

    if(tweet.length === 0){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    const verificarTweet = arrayTweets.find((item) => { 
        return item.username === username && item.tweet === tweet
    });

    const avatarCorrespondente = arrayUsuarios.find((usuario) =>{
        return usuario.username === username
    });

    if(verificarTweet !== undefined){
        res.status(422).send("Você já postou esse tweet!");
    }
    if(verificarTweet === undefined){
        const avatar = avatarCorrespondente.avatar;
        arrayTweets.push({username, tweet, avatar});
        res.status(201).send('OK');
    }
}

function getTweets(req, res){
    if(arrayTweets.length >= 0 && arrayTweets.length <= 10){
        res.send(arrayTweets);
    }
    if(arrayTweets.length > 10){
        let arrayReduzido = arrayTweets.slice(arrayTweets.length - 10, arrayTweets.length);
        res.send(arrayReduzido);
    }
}

function getTweetsUsuario(req, res){
    const { idUsuario } = req.params;

    const usuarioEncontrado = arrayUsuarios.find((usuario) =>{
        return usuario.username === idUsuario
    });

    if(usuarioEncontrado === undefined){
        res.status(404).send("Usuário não encontrado!");
    }
    if(usuarioEncontrado !== undefined){
        const tweetsUsuario = arrayTweets.filter((tweet) =>{
            return tweet.username === idUsuario
        });
        if(tweetsUsuario.length === 0){
            res.status(201).send("Usuário não possui tweets!");
        }
        if(tweetsUsuario.length > 0){
            res.status(201).send(tweetsUsuario);
        }
    }
}

export { postSignUp, postTweets, getTweets, getTweetsUsuario };