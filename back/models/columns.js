const mongoose = require('mongoose');
const columnSchema =new mongoose.Schema({

    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'card' }]
    
   
})

const columnModel = mongoose.model('column', columnSchema);
module.exports=columnModel;
