import BaseDatabase from "./baseDatabase";


export class UserDatabase extends BaseDatabase{

    private static TABLE_NAME = "PIXALABON_USERS";

    public async createUser(input: any, id: string): Promise<void>{
        try{
           const {name, email, nickname, password } = input

            await BaseDatabase.connection.raw(`
             INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, email, nickname, password)
             VALUES(
                 "${id}",
                 "${name}",
                 "${email}",
                 "${nickname}",
                 "${password}"
             )`)
        }
        catch(e){
            throw new Error(e.message && e.sqlMessage)
        }
    }
    public async getUserByEmailOrNickname(emailOrNickname: string): Promise<any>{
        try{
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${UserDatabase.TABLE_NAME}
                WHERE email = "${emailOrNickname}" 
                OR nickname = "${emailOrNickname}"
            `)
            
            return result[0][0]
        }
        catch(e){
            throw new Error(e.message && e.sqlMessage)
        }
    }
}