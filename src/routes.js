module.exports = (app) => {

    //USER ROUTES
    const userController = require('../controllers/userController');

    app.post('/api/users/insert', userController.create)

    app.get('/api/users/list',userController.list)

    app.get('/api/users/list/:id', userController.search)

    app.put('/api/users/list/:id', userController.update)

    app.delete('/api/users/delete/:id', userController.delete)

    //PRODUCTS ROUTES
    const productController = require('../controllers/productController');

    app.get('/api/products/list', productController.list);

    app.get('/api/products/list/:id', productController.search);

    app.post('/api/products/insert', productController.create);

    app.put('/api/products/list/:id', productController.update);

    app.delete('/api/products/delete/:id', productController.delete);
}