import { Collection } from "../business/entities/collection";
import BaseDatabase from "./baseDatabase";
import { Model } from "./model/models";

export class CollectionDatabase extends BaseDatabase{
    private static TABLE_NAME_1 = "PIXALABON_COLLECTION";

    public async getCollectionByUserId(userId: string): Promise<any>{
        try{
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${CollectionDatabase.TABLE_NAME_1}
                WHERE user_id = "${userId}"
            `)
            return result[0]
           
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
}