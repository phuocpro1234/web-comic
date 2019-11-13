const chapterModel = require('../models/chapter.model');
const httpStatus = require('http-status');

module.exports = {
   createListChapter: async (req, res) => {
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
    },
    addNewChapter: async (req, res) => {
        try {
             //<--------------checking comic is already exist---------------->
            
            const comicExist = await chapterModel.findOne({comicID: req.params.id});
            if(!comicExist) 
                res.send("cannot find comic");
            const newChapter={
                chapterNumber: req.body.chapterNumber,
                description: req.body.description,
                image: req.body.image,
                video: req.body.video,
                content: req.body.content
            }
            
            const checkChapterNumber= comicExist.detail.find((element) => { 
                return element.chapterNumber===newChapter.chapterNumber; 
            });
            if(typeof checkChapterNumber !== "undefined")
                res.send("Chapter is exist !");
            comicExist.detail.push(newChapter);
            comicExist.detail.sort( (a, b) => {
                return a.chapterNumber > b.chapterNumber ? 1 : -1;
            });
            await comicExist.save();
            res.send("Chapter successfully added !");
        } catch(err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    updateChapter: async (req, res) => {
        try {
            
            //<-----------------------update info----------------------------->
            const comic = await comicModel.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true });
            await comic.save();
            res.send('update successfully!');

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    deleteChapter: async (req, res) => {
        try {
            const comicExist = await chapterModel.findOne({comicID: req.params.id});
            if(!comicExist) 
                res.send("cannot find comic");
            const removeChapter = req.body.chapterNumber;
            const getChapter= comicExist.detail.find((element) => { 
                return element.chapterNumber===removeChapter; 
            });
            if(typeof removeChapter === "undefined")
                res.send("Chapter is not exist !");
            comicExist.detail.splice(removeChapter-1,1);
            res.send("Chapter is deleted !");
            await comicExist.save();
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    getAllChapter: async (req, res) => {
        let chapter = await chapterModel.find();
        res.send(chapter);
    }
}