import {Request, Response} from 'express'
import { CollectionBusiness } from '../business/collectionBusiness';
import { CollectionDatabase } from '../data/collectionDatabase';
import { Authenticator } from '../business/services/Authenticator';
import { IdGenerator } from '../business/services/IdGenerator';

const collectionBusiness = new CollectionBusiness(
    new IdGenerator(),
    new Authenticator(),
    new CollectionDatabase()
)

export class CollectionController{
    public async getUserCollections(req: Request, res: Response){
        try{
            const token = req.headers.authorization as string

            const collection = await collectionBusiness.businessCollection(token)

            res
            .status(200)
            .send(collection)

        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
    public async createCollection(req: Request, res: Response){
        try{
            const token = req.headers.authorization as string

            const name =  req.body.name
             
            await collectionBusiness.businessCreateCollection(token, name)

            res
            .status(200)
            .send("Collection created!")
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
}

