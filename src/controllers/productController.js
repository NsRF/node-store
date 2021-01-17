import products from "../databases/models/products.js"
import excel from "exceljs"

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

export function listXlsx(req, res){
    products.find((err, result)=>{
        if(err) return res.send(err)
        else{
            const jsonResult = JSON.parse(JSON.stringify(result))
            //console.log(jsonResult)

            const workbook = new excel.Workbook()
            const worksheet = workbook.addWorksheet("Products")

            worksheet.columns = [
                {header: 'Name', key: 'name', width: 30},
                {header: 'Price', key: 'price', width: 10},
                {header: 'Category', key: 'category', width: 10},
            ]
            worksheet.addRows(jsonResult)

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'products.xlsx')

            return workbook.xlsx.write(res).then(() => {res.status(200).end()})
        }
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

