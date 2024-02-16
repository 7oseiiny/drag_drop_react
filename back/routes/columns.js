const express = require('express');
const { postcolumn, getcolumn, patchcolumn } = require('../controllers/columns');
const router = express.Router();

router.route("/")
    .get(getcolumn)
    .post(postcolumn)
    .patch(patchcolumn)



// router.route("/:Id")
//     .get()
//     .patch()
//     .delete()



module.exports = router