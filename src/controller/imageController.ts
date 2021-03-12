import {Request, Response} from 'express'
import { imageInputDTO } from '../business/entities/image';
import { ImageBusiness } from '../business/imageBusiness';
import { Authenticator } from '../business/services/Authenticator';
import { IdGenerator } from '../business/services/IdGenerator';
import { ImageDatabase } from '../data/imageDatabase';
import { UserDatabase } from '../data/userDatabase';

const imageBusiness = new ImageBusiness(
    new IdGenerator(),
    new Authenticator(),
    new ImageDatabase(),
    new UserDatabase()
)

export class ImageController{
    public async createImage(req: Request, res: Response){
        try{
            const input: imageInputDTO = {
                subtitle: req.body.subtitle,
                file: req.body.file,
                tagsId: req.body.tagsId,
                collectionId: req.body.collectionId
            }
            const token = req.headers.authorization as string

            await imageBusiness.createImage(input, token)
            
            res
            .status(201)
            .send("successfully created image!")

        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
    public async getImagesFull(req: Request, res: Response){
        try{
            const result = await imageBusiness.getImagesFeed()
            res
            .send(result)
            .status(200)
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
    public async getImagesByUserId(req: Request, res: Response){
        try{    
            const token = req.headers.authorization as string

            const images = await imageBusiness.getImagesByUserId(token) 

            res
            .send(images)
            .status(200)
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
}