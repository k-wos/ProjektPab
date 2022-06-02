var express = require('express');
var app = express();
app.get('/', function (req, res) {
});
app.get('/dodaj/:a/:b', function (req, res) {
    var a = parseInt(req.params.one);
    var b = parseInt(req.params.two);
    var result = a + b;
    res.send(a + " + " + b + " = " + result);
});
app.get('/odejmij/:a/:b', function (req, res) {
    var a = parseInt(req.params.one);
    var b = parseInt(req.params.two);
    var result = a - b;
    res.send(a + " - " + b + " = " + result);
});
app.get('/podzel/:a/:b', function (req, res) {
    var a = parseInt(req.params.one);
    var b = parseInt(req.params.two);
    var result = a / b;
    res.send(a + " / " + b + " = " + result);
});
app.get('/pomnoz/:a/:b', function (req, res) {
    var a = parseInt(req.params.one);
    var b = parseInt(req.params.two);
    var result = a * b;
    res.send(a + " * " + b + " = " + result);
});
app.listen(3000);
