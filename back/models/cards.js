const mongoose = require('mongoose');
const cardSchema =new mongoose.Schema({

    name: String
    
})

const cardModel = mongoose.model('card', cardSchema);
module.exports=cardModel;
