const express = require('express');
const ped = express.Router();
const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const db = require('../models/db');

ped.get('/pedido', (req, res) => {
    db.sequelize.query("select "
        + "pedido.id as id, "
        + "cliente.nome as nome, "
        + "produto.descricao as descricao, "
        + "pedido.qtd_produto as qtdProduto, "
        + "pedido.valor_total as valorTotal "
        + "from pedidos as pedido "
        + "left join clientes as cliente on cliente.id = pedido.cliente "
        + "left join produtos as produto on produto.id = pedido.produto ").then(([results, metadata]) => {
            let pedidosAll = metadata;
            Produto.findAll({ order: [['id', 'DESC']] }).then(function (prod) {
                let produtosAll = prod;
                Cliente.findAll({ order: [['id', 'DESC']] }).then(function (cli) {
                    let clientesAll = cli;
                    res.render(__dirname + './../views/layouts/pedido',
                        {
                            pedidos: pedidosAll,
                            clientes: clientesAll,
                            produtos: produtosAll
                        });
                });
            });
        });

})


ped.get('/delete/:id', (req, res) => {
    Pedido.destroy({ where: { id: req.params.id } }).then(function () {
        res.redirect('/pedido/pedido')
    }).catch(function (erro) {
        res.send("Informação inexistente");
    })
});

ped.post('/create', (req, res) => {
    Pedido.create({
        cliente: req.body.cliente,
        produto: req.body.produto,
        qtd_produto: req.body.qtd_produto,
        valor_total: req.body.valor_total
    }).then(function () {
        res.redirect('/pedido/pedido')
    }).catch(function (erro) {
        res.send("Erro ao inserir: " + erro);
    });
});

module.exports = ped;