const comicModel = require('../models/comic.model');
const httpStatus = require('http-status');

module.exports = {
    addComic: async (req, res) => {
        try {
        	//<--------------checking name of comic is already exist---------------->
        	const nameExist = await comicModel.findOne({name: req.body.name});
        	if(nameExist) 
        		return res.status(httpStatus.BAD_REQUEST).send("comic name already exist");
        	//<-------------------------create a comic------------------------------>
        	// const comic = new comicModel({
        	// 	name: req.body.name,
        	// 	image: req.body.image,
        	// 	description: req.body.description
        	// });
            const comic = new comicModel(req.body);
        	//<-------------------------save to database---------------------------->
        	await comic.save();
        	res.send("Comic successfully created !");
        } catch {
        	res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const deleteComic = await comicModel.findOneAndRemove();
            return (!deleteComic) ? res.send("cannot delete this comic") : res.send("Comic successfully deleted!");
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getComicById: async (req, res) => {
        try {
            const comic = await comicModel.findById(req.params.id);
            res.send(comic);
        } catch (err) {
            console.log("error")
            return res.status(httpStatus.BAD_REQUEST).send(err)
        }
    },
    update: async (req, res) => {
        try {
            
            //<-----------------------update info----------------------------->
            const comic = await comicModel.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true });
            await comic.save();
            res.send('update successfully!');

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    getAllComic: async (req, res) => {
    	let comic = await comicModel.find();
    	res.send(comic);
    }
}