const express = require('express');
const router = express.Router();
const questions = require('../public/questions.json');

router.use((req, res, next) => { //testing purpose middleware
    console.log(req.sessionID);
    next();
});

router.get('/getQuestion', (req, res) => {
    if ('qid' in req.session) {
        // existing session logic
        let id = req.session.qid;
        if (id == questions.length) res.status(200).send({ "message": "done", ...req.session.answers });
        else res.status(200).send(questions[id]);
    }
    else {
        // new session logic
        req.session.qid = 0;
        res.status(200).send(questions[0]);
    }

})

router.post('/answer', (req, res) => {
    // session modification to persist, increment logic
    req.session.qid = req.session.qid + 1;
    // existing answers in session
    if ('answers' in req.session) req.session.answers.push(req.body);
    else req.session.answers = [req.body]; // no answers in session
    res.status(200).send({ "message": "next" });

})

module.exports = router;