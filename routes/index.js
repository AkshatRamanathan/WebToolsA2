const express = require('express');
const router = express.Router();
const questions = require('../public/questions.json');

router.get('/getQuestion', (req, res) => {
    console.log(req.session);
    let question = {};
    currentId = req.session.questionId ?? 0;
    if (!currentId) req.session.questionId = 0;
    if (currentId === questions.length - 1) res.status(200).send({ "message": "done" })
    question = questions[currentId]
    res.status(200).send(question);
})

router.post('/answer', (req, res) => {
    console.log(req.body);
    if (!req.session.answers) {
        req.session.answers = [req.body]
    }
    else {
        req.session.answers.push(req.body);
    }
    res.json({ "message": "next" })
})

module.exports = router;