const express = require('express')
const router = express.Router();

const userAuthenticator = require('../../services/auth/userAuthenticator')
const recordService = require('../../services/collections/record');
const handleClientException = require('../../services/exceptions/handleClientException');

router.post('/', userAuthenticator, async (req, res) => {
    try{
        console.log(req.body)
        res.json({
            "record": 
                await recordService.create({
                    id_creator: req.body.user_id,
                    name: req.body.name,
                    type: req.body.type,
                    date: req.body.date,
                    amount: req.body.amount,
                    description: req.body.description
                })
        })
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.get('/:month/:year', userAuthenticator, async (req, res, next) => {
    try{
        res.json( { "records": await recordService.findByMonthAndYear(req.params.month, req.params.year, req.body.user_id) })
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.patch('/', userAuthenticator, async (req, res, next) => {
    try{
        console.log(rec.body)
        res.json({
            "record": await recordService.update(req.body.user_id, req.body.record_update) 
        })
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.delete('/:rec_id', userAuthenticator, async (req, res, next) => {
    try{
        console.log(rec.body)
        res.json( {
            "record": await recordService.deleteRecord(req.params.rec_id, req.body.user_id) 
        });
    }
    catch(e){
        handleClientException(res, e);
    }
})

module.exports = router;