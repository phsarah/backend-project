import express from 'express'
import { UserController } from '../userController';
import { CollectionController } from '../collectionController';


export const userRouter = express.Router();

const userController = new UserController()
const collectionController = new CollectionController()


userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.get('/collections', collectionController.getUserCollections)
userRouter.get('/infos', userController.getUser)
