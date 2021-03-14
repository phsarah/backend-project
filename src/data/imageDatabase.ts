import { Image, imageInputDTO } from "../business/entities/image";
import BaseDatabase from "./baseDatabase";
import { Model } from "./model/models";


export class ImageDatabase extends BaseDatabase{

    private static TABLE_NAME_1 = "PIXALABON_IMAGES";
    private static TABLE_NAME_2 = "PIXALABON_TAG_IMAGE";
    private static TABLE_NAME_3 = "PIXALABON_TAGS";
    

    public async insertDataIntoImage(input: imageInputDTO, id: string, date: string, author: string){
        try{
            await BaseDatabase.connection.raw(`
                INSERT INTO ${ImageDatabase.TABLE_NAME_1}(id, subtitle, author, date, file, collection)
                VALUES(
                    "${id}",
                    "${input.subtitle}",
                    "${author}",
                    "${date}",
                    "${input.file}",
                    "${input.collectionId}"
                )
            `)
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
    public async insertIntoIntercession(tagsId: Array<string>, imageId: string){
        try{
            for(let i=0; i <= tagsId.length; i++){

                const resultOfTagChecking = await BaseDatabase.connection.raw(`
                    SELECT * FROM ${ImageDatabase.TABLE_NAME_3}
                    WHERE id = "${tagsId[i]}"
                `)

                if(resultOfTagChecking[0].length == true){
                    
                    await BaseDatabase.connection.raw(`
                     INSERT INTO ${ImageDatabase.TABLE_NAME_2} (image_id, tag_id)
                         VALUES(
                            "${imageId}",
                            "${tagsId[i]}"
                        )
                    `)
                }
                else{
                    throw new Error(`Tag not found: '${tagsId[i]}'`)
                }
                i++
            }
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
    public async getImagesFeed(): Promise<any>{
        try{
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${ImageDatabase.TABLE_NAME_1}
                INNER JOIN PIXALABON_USERS
                ON PIXALABON_IMAGES.author = PIXALABON_USERS.id;
            `)
            console.log(result[0])

            
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
    public async getImagesById(userId: string): Promise<any>{
        try{
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${ImageDatabase.TABLE_NAME_1}
                WHERE author = "${userId}"
            `)
            return result[0]
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
    public async getImagesByCollection(id: string): Promise<any>{
        try{
            const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${ImageDatabase.TABLE_NAME_1}
            WHERE collection = "${id}"
            
        `)
        return result[0]
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
}
const imageDatabase = new ImageDatabase

imageDatabase.getImagesFeed()


