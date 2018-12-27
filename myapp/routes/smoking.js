var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    var result = {};

    models.sequelize.query("select location, smoke from `sjsmoking`",  {
    type: models.sequelize.QueryTypes.SELECT
        }).then((results, metadata) => {
        result = results[0];

        res.json(result);
    });
});

router.post('/', function(req, res, next) {

    models.sequelize.query(`update \`sjsmoking\` set location=${req.query.location}, smoke=${req.query.smoke}`,  {
        type: models.sequelize.QueryTypes.UPDATE
    }).then((results, metadata) => {
        
    });
});

module.exports = router;