const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "API está rodando perfeitamente!" });
});

module.exports = router;
