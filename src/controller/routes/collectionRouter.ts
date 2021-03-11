import express from 'express'
import  { CollectionController }  from '../collectionController';

export const collectionRouter = express.Router();

const collectionController = new CollectionController()

collectionRouter.post('/create', collectionController.createCollection)
