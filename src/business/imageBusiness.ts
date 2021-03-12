import { ImageDatabase } from "../data/imageDatabase";
import { UserDatabase } from "../data/userDatabase";
import { imageInputDTO } from "./entities/image";
import { CustomError } from "./error/customError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class ImageBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private imageDatabase: ImageDatabase,
        private userDatabase: UserDatabase
    ) { }
  public async createImage(input: imageInputDTO, token: string){

    if(!input.subtitle){
      throw new CustomError(417, "Invalid subtitle, enter a subtitle for the image.")
    }
    if(!input.file){
      throw new CustomError(417, "Invalid file, enter an image file.")
    }
    if(!input.collectionId){
      throw new CustomError(417, "Invalid collection id, enter a collection id.")
    }

    const id = this.idGenerator.generate()

    const creationDate = new Date()
    const convertedDate = [creationDate.getFullYear(), (creationDate.getMonth() + 1 ), creationDate.getDate()].join("-")

    const tokenData = this.authenticator.getData(token)
     
    const userDatabase = await this.userDatabase.getUserById(tokenData.id)
    
    await this.imageDatabase.insertDataIntoImage(input, id, convertedDate, userDatabase.id)

    if(input.tagsId.length){
      await this.imageDatabase.insertIntoIntercession(input.tagsId, id)
    }
  }
  public async getImagesFeed(){
    
    return await this.imageDatabase.getImagesFeed()
    
  }
  public async getImagesByUserId(token: string){

    const tokenData = this.authenticator.getData(token)

    const images = await this.imageDatabase.getImagesById(tokenData.id)
    
    return images
  }
}