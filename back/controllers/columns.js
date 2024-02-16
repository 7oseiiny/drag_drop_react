const columnModel = require("../models/columns");

exports.postcolumn = async function (req, res) {
     try {

          let column = req.body
          columnModel.create(column)
          res.send(column);
     }
     catch { res.send("err")}
}

exports.getcolumn = async function (req, res) {
     try {

          let columns=await columnModel.find().populate('cards')
          res.send(columns);
     }
     catch { res.send("err")}
}
exports.patchcolumn = async function (req, res) {
     try {

          for (const col of req.body) {

               let cardsIDs=[]
               console.log("cardsIDs");

               for (const card of col.cards) {
                     cardsIDs.push(card._id)
               } 
               console.log(cardsIDs);
               await columnModel.findByIdAndUpdate(col._id,{cards:cardsIDs})
          }
          res.send("success")
     }
     catch { res.send("err")}
}