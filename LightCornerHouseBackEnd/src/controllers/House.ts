import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import houses from '../models/houses';

const createHouse = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, comments, location, photos, defaultImg, rating, space } = req.body;

    const House = new houses({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        comments,
        location,
        photos,
        defaultImg,
        rating,
        space
    });

    return House.save()
        .then((House) => res.status(201).json({ House }))
        .catch((error) => res.status(500).json({ error }));
};

const readHouse = (req: Request, res: Response, next: NextFunction) => {
    const HouseId = req.params.HouseId;

    return houses
        .findById(HouseId)
        .then((houses) => (houses ? res.status(200).json({ houses }) : res.status(404).json({ message: 'Not Found.' })))
        .catch((error) => res.status(500).json({ message: error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return houses
        .find()
        .then((houses) => (houses ? res.status(200).json({ houses }) : res.status(404).json({ message: 'You Dont Have Houses.' })))
        .catch((error) => res.status(500).json({ error }));
};

const UpdateHouse = (req: Request, res: Response, next: NextFunction) => {
    const HouseId = req.params.HouseId;

    return houses
        .findById(HouseId)
        .then((houses) => {
            if (houses) {
                houses.set(req.body);
                return houses
                    .save()
                    .then((houses) => res.status(201).json({ houses }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not Found' });
            }
        })
        .catch((error) => res.status(500).json({ message: error }));
};
const DeleteHouse = (req: Request, res: Response, next: NextFunction) => {
    const HouseId = req.params.HouseId;

    return houses
        .findByIdAndDelete(HouseId)
        .then((houses) => (houses ? res.status(201).json({ message: 'Deleted House' }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ message: error }));
};

const GetHousesWPhotos = (req: Request, res: Response, next: NextFunction) => {
    return houses
        .find({}, { photos: 0 })
        .then((houses) => (houses ? res.status(200).json({ houses }) : res.status(404).json({ message: 'You Dont Have Houses.' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createHouse,
    readHouse,
    readAll,
    GetHousesWPhotos,
    DeleteHouse,
    UpdateHouse
};
