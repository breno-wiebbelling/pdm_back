const express = require('express');
const router = express.Router();

const userAuthenticator = require('../../services/auth/userAuthenticator');
const userService = require('../../services/collections/user');
const handleClientException = require('../../services/exceptions/handleClientException');

router.get('/', userAuthenticator, async (req, res, next) => {
    try{
        res.json( await userService.userById(req.body.user_id) )
    }
    catch(e){
        handleClientException(res, e);
    }
});

router.post('/', async (req, res) => {
    try{
        res.json(
            await userService.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        )
    }
    catch(e){
        handleClientException(res, e);
    }
});

router.delete('/', userAuthenticator, async (req, res, next) => {
    try{
        res.json( await userService.remove(req.body.email, req.body.password, req.body.user_id) )
    }
    catch(e){
        handleClientException(res, e);
    }
});

router.post('/login', async (req, res) => {
    try{
        console.log(req.body)
        res.json( await userService.login(req.body.email, req.body.password) )
    }
    catch (e) {
        handleClientException(res, e)
    }
});

module.exports = router;