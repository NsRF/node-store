import users from '../databases/models/users.js'
import exceljs from 'exceljs'


export function create(req, res){
    if(!req.body) return res.status(400).send("Corpo esta nulo!");
    users.create(req.body, function (err, result){
        if(err) res.send(err);
        res.json(result);
    })
}

export function list(req, res) {
    users.find(function (err, result) {
        if (err) res.send(err);
        else res.json(result);
    });
}

export function xlsxList(req, res){
    users.find(function (err, result)
    {
        if(err) return res.send(err)
        else {
            const jsonResult = JSON.parse(JSON.stringify(result))

            const workbook = new exceljs.Workbook()
            const worksheet =  workbook.addWorksheet('Users')

            worksheet.columns = [
                {header: 'Username', key: 'username', width: 10},
                {header: 'Name', key: 'name', width: 30},
                {header: 'E-mail', key: 'email', width: 30},
                {header: 'CPF/CNPJ', key: 'cpfcnpj', width: 10},
            ]
            worksheet.addRows(jsonResult)

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'users.xlsx')

            return workbook.xlsx.write(res).then(() => {res.status(200).end()})
        }
    })
}

export function search(req, res){
    users.findById(req.params.id, function (err, result){
        if(err) res.send(err);
        else res.send(result);
    })
}

export function remove(req, res){
    users.findByIdAndDelete(req.params.id, function (err, result){
        if(err) res.send(err);
        else res.json({ message: "Deleted with success!" });
    });
}

export function update(req, res){
    users.findByIdAndUpdate(req.params.id, req.body, function (err, doc){
        if(err) res.send(err);
        else res.json({ message: "Modified with success!" });
    });
}