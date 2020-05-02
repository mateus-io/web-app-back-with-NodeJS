const { Router } = require('express');

const routes = new Router();

const StudentController = require('../controllers/StudentController');

const SearchController = require('../controllers/SearchController');

//Api restfull
/*
-----Protocolo HTTP-----
GET = obter dados
POST = acrescentar dados
PUT = editar dados 
DELETE = remover dados
*/
//PUT e DELETE usar 
routes.delete("/remove/:id", (req, res) => {
    console.log(req.params);
    return res.json(req.params);
});
routes.post("/students", StudentController.storeBySimpleCredentials );

routes.post("/students/github", StudentController.storeByGitHub );

routes.get("/students", StudentController.index );

routes.get("/search", SearchController.index );

routes.get("/students/:username", StudentController.show );

routes.delete("/students/:username", StudentController.destroy );

routes.put("/students/:username", StudentController.update);

routes.post("/create", (req, res) => {
    //inserir no banco de dados as infomações 
    console.log(req.body);
    return res.json({ok : 200});
});

routes.get("/home", (req, res) => {
    res.render('home');
});

routes.get("/", (req, res) => {
    //busca do banco de dados e retorna o json dos já cadastrados
    //finge que é esse
    console.log(req.query.search);
    let users = [
        {nome : "mateus", state : "parado"},
        {nome : "alguém", state : "movimentando"},
    ];
    for(let i = 0; i < users.length; i++){
        if(req.query.search === users[i].nome)
            return res.json({nome: users[i].nome, state : users[i].state});
    }
    return res.json({nome : "nenhum", state : "não encontrado"});
});


module.exports = routes;