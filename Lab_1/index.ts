
const express = require('express')
const app = express()
app.get('/', function (req, res) {
})
app.get('/dodaj/:a/:b', function (req, res) {
    let a = parseInt(req.params.one)
    let b = parseInt(req.params.two)
    let result = a+b
    res.send(a+" + "+b+" = "+result)
})
app.get('/odejmij/:a/:b', function (req, res) {
    let a = parseInt(req.params.one)
    let b = parseInt(req.params.two)
    let result = a-b
    res.send(a+" - "+b+" = "+result)
})
app.get('/podzel/:a/:b', function (req, res) {
    let a = parseInt(req.params.one)
    let b = parseInt(req.params.two)
    let result = a/b
    res.send(a+" / "+b+" = "+result)
})
app.get('/pomnoz/:a/:b', function (req, res) {
    let a = parseInt(req.params.one)
    let b = parseInt(req.params.two)
    let result = a*b
    res.send(a+" * "+b+" = "+result)
}) 
app.listen(3000)