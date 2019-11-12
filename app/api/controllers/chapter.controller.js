const chapterModel = require('../models/chapter.model');
const httpStatus = require('http-status');

module.exports = {
   addChapter: async (req, res) => {
        try {
             //<--------------checking comic is already exist---------------->
            // const comicIDExist = await chapterModel.findOne({comicID: req.body.comicID});
            // if(comicIDExist) 
            //     return res.status(httpStatus.BAD_REQUEST).send("comic already exist");
            //<--------------checking number of chapter is already exist---------------->
            const chapterNumberExist = await chapterModel.findOne({chapterNumber: req.body.detail[0].chapterNumber});
            if(chapterNumberExist) 
                return res.status(httpStatus.BAD_REQUEST).send("chapter already exist");
            //<-------------------------create a comic------------------------------>
            // const comic = new comicModel({
            //  name: req.body.name,
            //  image: req.body.image,
            //  description: req.body.description
            // });
            //const chapter = new chapterModel(req.body);


            const chapter = new chapterModel({
                comicID: req.params.id,
                detail:[{
                    chapterNumber: req.body.detail[0].chapterNumber,
                    description: req.body.detail[0].description,
                    image: req.body.detail[0].image,
                    video: req.body.detail[0].video,
                    content: req.body.detail[0].content
                }]                
            });
            //<-------------------------save to database---------------------------->
            await chapter.save();
            res.send("Chapter successfully created !");
        } catch(err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
}