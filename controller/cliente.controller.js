const express = require('express');
const cli = express.Router();
const Cliente = require('../models/Cliente');
const db = require('../models/db');

cli.get('/home', (req, res) => {
    res.render(__dirname + '/../views/layouts/home');
});

cli.get('/dashboard', (req, res) => {
    db.sequelize.query("select sum(valor_total) AS total from pedidos").then(([results, metadata]) => {
        let totalVendas = metadata;
        db.sequelize.query("select count(id) AS totalCli from clientes").then(([results, metadata]) => {
            let totalCli = metadata;
            db.sequelize.query("select count(id) AS totalProd from produtos").then(([results, metadata]) => {
                let totalProd = metadata;
                res.render(__dirname + '/../views/layouts/dashboard',
                    {
                        total: totalVendas,
                        totalClientes: totalCli,
                        totalProdutos: totalProd
                    });
            });
        });
    });
});

cli.get('/pedido', (req, res) => {
    res.render(__dirname + './../views/layouts/pedido');
});

cli.get('/cliente', (req, res) => {
    Cliente.findAll({order: [['id', 'DESC']]}).then(function(clientes){
        res.render(__dirname + '/../views/layouts/cliente', {clientes: clientes});
    });
});

cli.get('/one/:id', (req, res) => {
    Cliente.findOne({where: {id: req.params.id}}).then(function(cliente){
        res.render(__dirname + './../views/layouts/edit-cliente', {cliente: cliente});
    });
});

cli.get('/delete/:id', (req, res) => {
    Cliente.destroy({where: {id: req.params.id}}).then(function(){
        res.redirect('/cliente')
    }).catch(function(erro){
        res.send("Informação inexistente");
    })
});

cli.post('/create', (req, res) => {
    Cliente.create({
        nome: req.body.nome,
        cpf: req.body.cpf
    }).then(function(){
        res.redirect('/cliente')
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
        res.redirect('/cliente')
    }).catch(function(erro){
        res.send("Erro ao Editar: " + erro);
    });
});


module.exports = cli;