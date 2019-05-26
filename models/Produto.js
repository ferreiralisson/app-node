const db = require('./db');
const Produto = db.sequelize.define('produtos', {
    descricao: {
        type: db.Sequelize.STRING
    },
    valor: {
        type: db.Sequelize.STRING
    }
});

module.exports = Produto