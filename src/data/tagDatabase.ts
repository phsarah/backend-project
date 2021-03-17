import BaseDatabase from "./baseDatabase";

export class TagDatabase extends BaseDatabase{
    private static TABLE_NAME = "PIXALABON_TAGS"

    public async insertTag(id: string, userId: string, tagName: string):Promise<void>{
        try{
            await BaseDatabase.connection.raw(`
                INSERT INTO ${TagDatabase.TABLE_NAME}(id, tag_name, tag_user)
                VALUES(
                    "${id}",
                    "${tagName}",
                    "${userId}"
                )`)
        }
        catch(e){
            throw new Error(e.message && e.sqlMessage)
        }
    }

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
            if(!result){
                throw new Error("Esse id não tem nenhuma tag")
            }
            return result[0]
        }
        catch(e){
            throw new Error(e.message || e.sqlMessage)
        }
    }
}