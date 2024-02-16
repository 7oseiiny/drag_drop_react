const cardModel = require("../models/cards");

exports.postcard = async function (req, res) {
     try {

          let card = req.body
          cardModel.create(card)
          res.send(card);
     }
     catch { res.send("err")}
}

exports.getcard = async function (req, res) {
     try {

          let cards=await cardModel.find()
          res.send(cards);
     }
     catch { res.send("err")}
}