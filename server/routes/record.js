const express = require('express')
const router = express.Router();

const userAuthenticator = require('../../services/auth/userAuthenticator')
const recordService = require('../../services/collections/record');
const handleClientException = require('../../services/exceptions/handleClientException');

router.post('/', userAuthenticator, async (req, res) => {
    try{
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
        res.json( { 
            "records": (await recordService
                .findByMonthAndYear(req.params.month, req.params.year, req.body.user_id))
                .map(record => {
                    fomatedDate = record.date.toLocaleDateString();
                    console.log(
                        
                    )

                    return record;
                })
        })
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.patch('/', userAuthenticator, async (req, res, next) => {
    try{
        res.json({
            "record": await recordService.update(
                req.body.user_id, 
                {
                    '_id':  req.body.record_id,
                    'id_creator':  req.body.user_id,
                    'name': req.body.record_name, 
                    'type': req.body.record_type,
                    'amount': req.body.record_amount, 
                    'date':   req.body.record_date,
                    'description': req.body.record_description, 
                }
            ) 
        })
    }
    catch(e){
        handleClientException(res, e);
    }
})

router.delete('/:rec_id', userAuthenticator, async (req, res, next) => {
    try{
        res.json({
            "record": await recordService
                .deleteRecord(req.params.rec_id, req.body.user_id)
        });
    }
    catch(e){
        handleClientException(res, e);
    }
})

module.exports = router;