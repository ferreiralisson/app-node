const express = require('express');
const pro = express.Router();
const Produto = require('../models/Produto');

pro.get('/produto', (req, res) => {
    Produto.findAll({order: [['id', 'DESC']]}).then(function(produtos){
        res.render(__dirname + './../views/layouts/produto', {produtos: produtos});
    });
});

pro.get('/one/:id', (req, res) => {
    Produto.findOne({where: {id: req.params.id}}).then(function(produto){
        res.render(__dirname + './../views/layouts/edit-produto', {produto: produto});
    });
});

pro.get('/delete/:id', (req, res) => {
    Produto.destroy({where: {id: req.params.id}}).then(function(){
        res.redirect('/produto/produto')
    }).catch(function(erro){
        res.send("Informação inexistente");
    })
});

pro.post('/create', (req, res) => {
    Produto.create({
        descricao: req.body.descricao,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/produto/produto')
    }).catch(function(erro){
        res.send("Erro ao inserir: " + erro);
    });
});

pro.post('/update/:id', (req, res) => {
    Produto.update({
        descricao: req.body.descricao,
        valor: req.body.valor
    },
    {
        where: {
            id: req.params.id
        }
    }).then(function(){
        res.redirect('/produto/produto')
    }).catch(function(erro){
        res.send("Erro ao Editar: " + erro);
    });
});


module.exports = pro;