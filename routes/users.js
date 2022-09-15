const controller = require('../controller/index');

module.exports = (app) => {

    app.route('/api/users')
        .get(controller.users.getAll);

    app.route('/api/users/:id')
        .get(controller.users.getDetail)
        .delete(controller.users.delete);
}