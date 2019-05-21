const express = require('express');
const cli = express();
const Cliente = require('../models/Cliente');


cli.get('/home', (req, res) => {
    res.render(__dirname + '/../views/layouts/home');
});

cli.get('/dashboard', (req, res) => {
    res.render(__dirname + '/../views/layouts/dashboard');
});

cli.get('/produto', (req, res) => {
    res.render(__dirname + '/../views/layouts/produto');
});

cli.get('/pedido', (req, res) => {
    res.render(__dirname + '/../views/layouts/pedido');
});

cli.get('/cliente', (req, res) => {
    Cliente.findAll({order: [['id', 'DESC']]}).then(function(clientes){
        console.log(clientes);
        res.render(__dirname + '/../views/layouts/cliente', {clientes: clientes});
    });
});

cli.get('/one/:id?', (req, res) => {
});

cli.get('/delete/:id', (req, res) => {
    Cliente.destroy({where: {id: req.params.id}}).then(function(){
        // res.send("Deletado com sucesso");
        res.redirect('/cli/cliente');
    }).catch(function(erro){
        res.send("Informação inexistente");
    })
});

cli.post('/create', (req, res) => {
    Cliente.create({
        nome: req.body.nome,
        cpf: req.body.cpf
    }).then(function(){
        res.redirect('/cli/cliente')
    }).catch(function(erro){
        res.send("Erro ao inserir: " + erro);
    });
});

cli.post('/update/:id', (req, res) => {
    Cliente.update({
        nome: req.body.nome,
        cpf: req.body.cpf
    },
    {
        where: {
            id: req.params.id
        }
    }).then(function(){
        res.redirect('/cli/cliente')
    }).catch(function(erro){
        res.send("Erro ao Editar: " + erro);
    });
});


module.exports = cli;