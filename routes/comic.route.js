const express = require('express');
const router = express.Router();
const comicController = require('../app/api/controllers/comic.controller');

router.get('/create-comic', comicController.addComic);
router.get('/list-comic', comicController.getAllComic);
router.delete('/delete-comic', comicController.delete);
router.get('/:id', comicController.getComicById);
router.get('/:id/update', comicController.update);


module.exports = router;
