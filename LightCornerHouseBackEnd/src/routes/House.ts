import express from 'express';
import controller from '../controllers/House';

const router = express.Router();

router.post('/create', controller.createHouse);
router.get('/get/:HouseId', controller.readHouse);
router.get('/get/', controller.readAll);
router.get('/GetHousesWPhotos', controller.GetHousesWPhotos);
router.patch('/update/:HouseId', controller.UpdateHouse);
router.delete('/delete/:HouseId', controller.DeleteHouse);

export = router;
