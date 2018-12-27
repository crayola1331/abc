var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    var result = {};

    models.sequelize.query("select location, smoke from `sjsmoking` where date is not null",  {
    type: models.sequelize.QueryTypes.SELECT
        }).then((results, metadata) => {
        result = results[0];
        
        res.json(result);

    });
});

router.get('/all', function(req, res, next) {
    var result = {};

    models.sequelize.query("select * from `sjsmoking`",  {
    type: models.sequelize.QueryTypes.SELECT
        }).then((results, metadata) => {
        result = results[0];
        
        res.json(results);

    });
});

router.post('/', function(req, res, next) {

    models.sequelize.query(`insert into \`sjsmoking\`values(${req.query.location}, ${req.query.smoke}, ${req.query.acCount},sysdate())`,  {
        type: models.sequelize.QueryTypes.INSERT
    }).then((results, metadata) => {
        res.end();
    });
});

router.put('/', function(req, res, next) {

    models.sequelize.query(`update \`sjsmoking\` set location=${req.query.location}, smoke=${req.query.smoke}`,  {
        type: models.sequelize.QueryTypes.UPDATE
    }).then((results, metadata) => {
        res.end();
    });
});

module.exports = router;