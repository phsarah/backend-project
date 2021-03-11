import BaseDatabase from "./baseDatabase";

export class TagDatabase extends BaseDatabase{
    private static TABLE_NAME = "PIXALABON_TAGS"

    public async selectTagById(id: string){
        try{
            await BaseDatabase.connection
                .select("*")
                .from(TagDatabase.TABLE_NAME)
                .where("id", "=", `${id}`)
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
}