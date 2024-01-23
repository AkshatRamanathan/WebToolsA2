const express = require('express');
const router = express.Router();
const questions = require('../public/questions.json');

router.get('/getQuestion', (req, res) => {
    let ques = {};
    if (!req.session) ques = questions[0];
    else if (req.session.data.id === questions.length) res.status(200).json({ "message": "done" })
    else {
        ques = questions[req.session.data.id + 1];
    }
    req.session = {
        data: {
            id: ques.id,
            question: ques.question
        }
    }
    res.status(200).send(ques);
})

router.post('/answer',(req,res)=>{
    res.send("test answer")
})

module.exports = router;