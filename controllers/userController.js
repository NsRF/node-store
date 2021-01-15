const users = require('../databases/models/users');


exports.create = (req, res) => {
    if(!req.body) return res.status(400).send("Corpo esta nulo!");
    users.create(req.body, function (err, result){
        if(err) res.send(err);
        res.json(result);
    })
};

exports.list = (req, res) => {
    users.find(function (err, result){
        if(err) res.send(err);
        else res.send({result});
    });
};

exports.search = (req, res) => {
    users.findById(req.params.id, function (err, result){
        if(err) res.send(err);
        else res.send(result);
    })
}

exports.delete = (req, res) => {
    users.findByIdAndDelete(req.params.id, function (err, result){
        if(err) res.send(err);
        else res.json({ message: "Deleted with success!" });
    });
};

exports.update = (req, res) => {
    users.findByIdAndUpdate(req.params.id, req.body, function (err, doc){
        if(err) res.send(err);
        else res.json({ message: "Modified with success!" });
    });
}