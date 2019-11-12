const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
    chapterID: {
        type: String,
        required: true,
        trim: true
    },
    comicID: {
        type: String,
        required: true,
        trim: true
    },
    chapterNumber: {
        type : int,
        required : true,
        trim : true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Chapter', chapterSchema, 'chapter');