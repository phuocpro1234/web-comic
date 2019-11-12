const express = require('express');
const router = express.Router();
const comicController = require('../app/api/controllers/comic.controller');
const chapterController = require('../app/api/controllers/chapter.controller');

router.get('/create-comic', comicController.addComic);
router.get('/list-comic', comicController.getAllComic);
router.delete('/delete-comic', comicController.delete);
router.get('/:id', comicController.getComicById);
router.put('/:id/update-comic', comicController.update);


router.get('/:id/create-chapter', chapterController.addChapter);
router.get('/:id/update-chapter', chapterController.addChapter);

module.exports = router;
