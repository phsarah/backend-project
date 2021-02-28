import { CollectionDatabase } from "../data/collectionDatabase";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class CollectionBusiness{
    businessImage: any;
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private collectionDatabase: CollectionDatabase
    ) { }

    public async businessCollection(token: string){
        const tokenData = this.authenticator.getData(token)

        const collection = await this.collectionDatabase.getCollectionByUserId(tokenData.id)

        return collection
    }
}