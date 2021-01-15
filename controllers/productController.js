const products = require('../databases/models/products');

exports.create = function(req,res){
    if(!req.body) return res.status(400).json({
        confirmation : "fail",
        data : "O corpo está vazio"
    });
    products.create(req.body, function (err, result){
        if(err) return res.send(err);
        else res.send(result)
    })
};

exports.list = (req, res) =>{
    products.find(function (err, result){
        if(err) return res.status(400).json({
            confirmation : "fail",
            data : err
        })
        else res.json({
            confirmation : "success",
            data : result
        })

    })
};

exports.search = (req, res) => {
    products.findById(req.params.id, function (err, result){
        if(err) return res.status(400).json({
            confirmation : "fail",
            data : err
        })
        else res.json({
            confirmation : "success",
            data : result
        })
    })
};

exports.update = (req, res) => {
    products.findByIdAndUpdate(req.params.id, req.body,  (err, result) => {
        if(err) return res.status(400).json({
            confirmation : "fail",
            data : err
        })
        else res.json({
            confirmation : "success",
            data : result
        })
    })
};

exports.delete= (req, res) => {
    products.findByIdAndDelete(req.params.id, function (err, result){
        if(err) return res.status(400).json({
            confirmation : "fail",
            data : err
        })
        else res.json({
            confirmation : "success",
            data : result
        })
    })
};

