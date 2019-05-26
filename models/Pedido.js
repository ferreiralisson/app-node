const db = require('./db');
const Pedido = db.sequelize.define('pedidos', {
    cliente: {
        type: db.Sequelize.NUMBER
    },
    produto: {
        type: db.Sequelize.NUMBER
    },
    qtd_produto: {
        type: db.Sequelize.NUMBER
    },
    valor_total: {
        type: db.Sequelize.STRING
    }
});

module.exports = Pedido