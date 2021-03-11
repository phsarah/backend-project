import { ImageDatabase } from "../data/imageDatabase";
import { TagDatabase } from "../data/tagDatabase";
import { imageInputDTO } from "./entities/image";
import { CustomError } from "./error/customError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class ImageBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private imageDatabase: ImageDatabase,
        private tagDatabase: TagDatabase
    ) { }

    public async createTag(){
        
    }

}