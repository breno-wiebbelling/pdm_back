const express = require('express')
const router = express.Router();

const userAuthenticator = require('../../services/auth/userAuthenticator')
const recordService = require('../../services/collections/record');
const handleClientException = require('../../services/exceptions/handleClientException');

router.post('/', userAuthenticator, async (req, res) => {
    try{
        res.json(
            await recordService.create({
                id_creator: req.body.user_id,
                type: req.body.type,
                date: req.body.date,
                amount: req.body.amount,
                description: req.body.description
            })
        )
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.get('/:record_id', userAuthenticator, async (req, res, next) => {
    try{
        res.json( await recordService.findById(req.params.record_id, req.body.user_id) )
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.get('/:month/:year', userAuthenticator, async (req, res, next) => {
    try{
        res.json( await recordService.findByMonthAndYear(req.params.month, req.params.year, req.body.user_id) )
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.patch('/', userAuthenticator, async (req, res, next) => {
    try{
        res.json( await recordService.update(req.body.user_id, req.body.record_id, req.body.record_update) )
    }
    catch(e){
        handleClientException(res, e);
    }
})

module.exports = router;