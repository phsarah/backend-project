import { ImageDatabase } from "../data/imageDatabase";
import { TagDatabase } from "../data/tagDatabase";
import { imageInputDTO } from "./entities/image";
import { CustomError } from "./error/customError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class TagBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private tagDatabase: TagDatabase
    ) { }

    public async createTag(){
        
    }
    public async selectTagById(token: string){
        const tokenData = this.authenticator.getData(token)
        return await this.tagDatabase.selectTagByIdUser(tokenData.id)
    }
}