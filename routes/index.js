const express = require('express');
const router = express.Router();
const questions = require('../public/questions.json');

router.use((req, res, next) => { //testing purpose
    console.log(req.sessionID);
    next();
});

router.get('/getQuestion', (req, res) => {
    if ('qid' in req.session) {
        let id = req.session.qid;
        if (id == questions.length) res.status(200).send({ "message": "done", ...req.session.answers });
        else res.status(200).send(questions[id]);
    }
    else {
        req.session.qid = 0;
        res.status(200).send(questions[0]);
    }

})

router.post('/answer', (req, res) => {
    req.session.qid = req.session.qid + 1;
    if ('answers' in req.session) req.session.answers.push(req.body);
    else req.session.answers = [req.body];
    res.status(200).send({ "message": "next" });

})

module.exports = router;