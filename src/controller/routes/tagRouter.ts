import express from 'express'
import { UserController } from '../userController';
import { TagController } from '../tagController';


export const tagRouter = express.Router();

const tagController = new TagController()


tagRouter.get('/user', tagController.getTagsByIdUser)
