import {Request, Response} from 'express'
import { imageInputDTO } from '../business/entities/image';
import { ImageBusiness } from '../business/imageBusiness';
import { Authenticator } from '../business/services/Authenticator';
import { IdGenerator } from '../business/services/IdGenerator';
import { TagDatabase } from '../data/tagDatabase';
import { TagBusiness } from '../business/tagBusiness';


const tagBusiness = new TagBusiness(
    new IdGenerator(),
    new Authenticator(),
    new TagDatabase()
)

export class TagController{
    public async getTagsByIdUser(req: Request, res: Response){
        try{
            const token = req.headers.authorization as string
            const tags = await tagBusiness.selectTagById(token)
            
            res
            .status(200)
            .send(tags)

        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message && e.sqlMessage });
        }
    }
  
}