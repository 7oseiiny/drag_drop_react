const express = require('express');
const { postcard, getcard } = require('../controllers/cards');
const router = express.Router();

router.route("/")
    .get(getcard)
    .post(postcard)



// router.route("/:Id")
//     .get()
//     .patch()
//     .delete()



module.exports = router