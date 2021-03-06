import {Router} from "express"
import jwt from "jsonwebtoken"
const router = Router()
import users from '../src/databases/models/users.js'

//AUTH
router.post('/login/', (req, res) =>{
   users.findOne({username: req.body.username}, (err, result) =>{
       const payload = [result.username, result.cpfcnpj]
       if(result.admin && req.body.username != null && req.body.password === result.password)
       {
           const token = jwt.sign({payload}, process.env.SECRET, {expiresIn: 300})
           return res.json({auth: true, token: token})
       }
       else
           return res.status(500).json({message: 'Login sem permissão ou inválido!'})
   })
})

router.post('/logout/', (req, res)=> {
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
import * as userController from "../src/controllers/userController.js"

router.post('/users/insert', verifyJwt, userController.create)

router.get('/users/list', verifyJwt, userController.list)

router.get('/users/listXlsx', userController.xlsxList)

router.get('/users/list/:id', verifyJwt, userController.search)

router.put('/users/list/:id', verifyJwt, userController.update)

router.delete('/users/delete/:id', verifyJwt, userController.remove)

//PRODUCTS ROUTES
import * as productController from './controllers/productController.js'

router.get('/products/list', verifyJwt, productController.list);

router.get('/products/listXlsx', productController.listXlsx);

router.get('/products/list/:id', verifyJwt, productController.search);

router.post('/products/insert', verifyJwt, productController.create);

router.put('/products/list/:id', verifyJwt, productController.update);

router.delete('/products/delete/:id', verifyJwt, productController.remove);

export default router