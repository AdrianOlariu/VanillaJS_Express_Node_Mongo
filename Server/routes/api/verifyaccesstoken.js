const express = require('express');
const app = express();

const router = express.Router();

router.get('/', (req,res) =>{
    res.json({"MSG":"VERIFY ACCESS TOKEN AVAILABILITY"}).status(201);
})

module.exports = router;