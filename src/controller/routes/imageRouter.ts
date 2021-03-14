import express from 'express'
import { ImageController } from '../imageController';

export const imageRouter = express.Router();

const imageController = new ImageController()

imageRouter.post('/create', imageController.createImage)
imageRouter.get('/mural', imageController.getImagesFull)
imageRouter.get('/all', imageController.getImagesByUserId)
imageRouter.get('collection/:id', imageController.getImagesByCollection)