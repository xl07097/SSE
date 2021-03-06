var express = require('express');
var router = express.Router();

router.route('/lists')
.get(function(req, res, next){
    res.send(JSON.stringify({
        "code": 200,
        "data": [{
                "id": "1",
                "title": "奥迪A6",
                "url": "/images/audi1.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "2",
                "title": "奥迪A6",
                "url": "/images/audi2.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "3",
                "title": "奥迪A6",
                "url": "/images/audi3.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "4",
                "title": "奥迪A6",
                "url": "/images/audi4.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "5",
                "title": "奥迪A6",
                "url": "/images/audi5.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "6",
                "title": "奥迪A6",
                "url": "/images/audi6.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "7",
                "title": "奥迪A6",
                "url": "/images/audi7.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "8",
                "title": "奥迪A6",
                "url": "/images/audi8.jpg",
                "introduction": "gagagag"
            }
        ]
    }))
})
.post(function (req, res, next) {
    logger.info(req.body.name);
    logger.info(req.headers.token);
    res.send({
        "code": 200,
        "data": [{
                "id": "1",
                "title": "奥迪A6",
                "url": "/images/audi1.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "2",
                "title": "奥迪A6",
                "url": "/images/audi2.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "3",
                "title": "奥迪A6",
                "url": "/images/audi3.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "4",
                "title": "奥迪A6",
                "url": "/images/audi4.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "5",
                "title": "奥迪A6",
                "url": "/images/audi5.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "6",
                "title": "奥迪A6",
                "url": "/images/audi6.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "7",
                "title": "奥迪A6",
                "url": "/images/audi7.jpg",
                "introduction": "gagagag"
            },
            {
                "id": "8",
                "title": "奥迪A6",
                "url": "/images/audi8.jpg",
                "introduction": "gagagag"
            }
        ]
    })
});

router.route('/getInfoById')
.get(function(req, res, next){
    logger.info(req.query.id);
    res.send({
        "code": 200,
        "data": {
             "id": "1",
             "title": "奥迪A6",
             "url": "/images/audi1.jpg",
             "introduction": "gagagag"
        }
    })
})
.post(function (req, res, next) {
    res.send({
        "code": 200,
        "data": {
             "id": "1",
             "title": "奥迪A6",
              "url": "/images/audi1.jpg",
              "introduction": "gagagag"
         }
    })
});

router.route('/:id')
.get(function(req, res, next){
    logger.info(req.params.id);
    res.send({
        "code": 200,
        "data": {
             "id": "1",
             "title": "奥迪A6",
             "url": "/images/audi1.jpg",
             "introduction": "gagagag"
        }
    })
})
.post(function (req, res, next) {
    res.send({
        "code": 200,
        "data": {
             "id": "1",
             "title": "奥迪A6",
              "url": "/images/audi1.jpg",
              "introduction": "gagagag"
         }
    })
});

module.exports = router;
