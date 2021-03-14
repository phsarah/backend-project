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
    public async selectTagByIdUser(userId: string){
        try{
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${TagDatabase.TABLE_NAME}
                WHERE user_id = "${userId}"
            `
            )
            console.log(result[0][0])
            return result[0][0]
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
}