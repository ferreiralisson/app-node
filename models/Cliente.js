const db = require('./db');
const Cliente = db.sequelize.define('clientes', {
    nome: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    }
});

module.exports = Cliente