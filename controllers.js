let [ arrayUsuarios, arrayTweets ] = [[ ], [ ]];

function postSignUp(req, res){
    const { username, avatar } = req.body;
    
    const tipoAvatar = (avatar.includes('jpg')) || (avatar.includes('png')) || (avatar.includes('gif')) || (avatar.includes('svg') || (avatar.includes('jpeg')));
    const validarAvatar = (avatar.includes("http")) && (tipoAvatar);

    if(username.length === 0 || avatar.length === 0){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    
    const verificarLogin = arrayUsuarios.find((usuario) => { 
        return usuario.username === username || usuario.avatar === avatar
    });

    if(!validarAvatar){
        res.status(400).send("O avatar deve ser uma URL válida!");
        return;
    }else{
        if(verificarLogin !== undefined){
            res.status(422).send("Usuário ou foto de perfil já foram cadastrados!");
        }
        if(verificarLogin === undefined){
            arrayUsuarios.push({username, avatar});
            res.status(201).send('OK');
        }
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
        res.send([...arrayTweets.reverse()]);
    }
    if(arrayTweets.length > 10){
        let arrayReduzido = [...arrayTweets.reverse().splice(0, 10)]
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