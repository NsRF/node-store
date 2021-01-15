module.exports = (app) => {
    const userController = require('../controllers/userController');

    app.post('/api/users/insert', userController.create)

    app.get('/api/users/list',userController.list)

    app.get('/api/users/list/:id', userController.search)

    app.put('/api/users/list/:id', userController.update)

    app.delete('/api/users/delete/:id', userController.delete)
}