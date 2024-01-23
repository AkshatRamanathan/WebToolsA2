const express = require('express')
const router = express.Router()

router.get('/result', (req, res) => {
    res.status(200).send('get final result')
})

router.post('/:id', (req, res) => {
    console.log(req.params);
    res.status(201).json({"message": "good"})
})

module.exports = router;