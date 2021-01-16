import products from "../databases/models/products.js"

export function create(req,res){
    if(!req.body) return res.status(400).json({
        confirmation : "fail",
        data : "O corpo está vazio"
    });
    products.create(req.body, function (err, result){
        if(err) return res.send(err);
        else res.send(result)
    })
}

export function list(req, res){
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
}

export function search(req, res){
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
}

export function update(req, res){
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
}

export function remove(req, res){
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
}

