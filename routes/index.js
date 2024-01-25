const express = require('express');
const router = express.Router();
const questions = require('../public/questions.json');

router.use((req, res, next) => { //testing purpose
    console.log(req.sessionID);
    next();
});

router.get('/getQuestion', (req, res) => {
    // req.session.visited = true;
    let qid;
    if ('qid' in req.session) qid = req.session.qid + 1;
    else qid = 0;
    req.session.qid = qid;
    if (qid == questions.length) res.status(200).send({ "message": "done" })
    res.status(200).send(questions[qid]);
})

router.post('/answer', (req, res) => {
    // console.log(req.body);
    if (!('answers' in req.session)) req.session.answers = [req.body];
    else req.session.answers.push(req.body);
    res.status(200).send({"message": "next"});
})

module.exports = router;