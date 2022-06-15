const controller = require('../controller/index');

module.exports = (app) => {
    
    app.route('/api/users')
        .get(controller.users.getAll);
}