const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String,
    required: true,
    index: {
        unique:true
        }
    },
    tool_name: {type: String, required: true},
    material: {type: String, required: true},
    cutting_speed: {type: Number, required: true},
    feed_rate: {type: Number, required: true},
});



module.exports = mongoose.model("parameter", schema);