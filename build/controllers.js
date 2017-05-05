var express = require('express');
// var app = express();

var router = express.Router();

var eleData = require('../data.json');

var seller = eleData.seller;
var goods = eleData.goods;
var ratings = eleData.ratings;

router.get('/seller', function(req, res) {
    res.json({
        erron: 0,
        data: seller
    });
});

router.get('/goods', function(req, res) {
    res.json({
        erron: 0,
        data: goods
    });
});

router.get('/ratings', function(req, res) {
    res.json({
        erron: 0,
        data: ratings
    });
});

module.exports = router;
