require("dotenv").config();
const jwt = require('jsonwebtoken');
const id = "6001c69599f85a110c2df790";
module.exports = (app) => {

    //AUTH
    app.post('/api/login/:id', (req, res) =>{
        if(req.params.id == id)
        {
            const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 300});
            return res.json({auth: true, token: token})
        }

        res.status(500).json({message: 'Login Invàlido'});
    })

    app.post('/api/logout/', (req, res)=> {
        res.json({auth: false, token: null});
    })

    function verifyJwt(req, res, next)
    {
        const token = req.headers['x-access-token'];
        if(!token) return res.status(400).json({auth: false, message: 'Sem token de autenticação!'})

        jwt.verify(token, process.env.SECRET, (err, decoded)=>{
            if(err) return res.status(500).json({auth: false, message: 'Falha de autenticação'})

            req.id = decoded.id;
            next();
        });
    }

    //USER ROUTES
    const userController = require('../controllers/userController');

    app.post('/api/users/insert', verifyJwt, userController.create)

    app.get('/api/users/list', verifyJwt, userController.list)

    app.get('/api/users/list/:id', verifyJwt, userController.search)

    app.put('/api/users/list/:id', verifyJwt, userController.update)

    app.delete('/api/users/delete/:id', verifyJwt, userController.delete)

    //PRODUCTS ROUTES
    const productController = require('../controllers/productController');

    app.get('/api/products/list', verifyJwt, productController.list);

    app.get('/api/products/list/:id', verifyJwt, productController.search);

    app.post('/api/products/insert', verifyJwt, productController.create);

    app.put('/api/products/list/:id', verifyJwt, productController.update);

    app.delete('/api/products/delete/:id', verifyJwt, productController.delete);
}