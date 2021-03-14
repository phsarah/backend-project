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

    public async createTag(token: string, tagName: string){
        const id = this.idGenerator.generate()
        const tokenData = this.authenticator.getData(token)

        await this.tagDatabase.insertTag(id, tokenData.id, tagName)
    }

    public async selectTagById(token: string){
        const tokenData = this.authenticator.getData(token)

        return await this.tagDatabase.selectTagByIdUser(tokenData.id)
    }
}