const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
    
    comicID: {
        type: String,
        required: true,
        trim: true
    },
    detail:[{
        chapterNumber: {
            type : Number,
            required : true,
            trim : true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image:[{
            type: String,
            trim:true
        }],
        video:{
            type:String,
            trim:true
        },
        content:{
            type:String,
            trim:true,
        }
    }]
})

module.exports = mongoose.model('Chapter', chapterSchema, 'chapter');