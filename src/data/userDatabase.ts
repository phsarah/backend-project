import { userInputDTO } from "../business/entities/user";
import { CustomError } from "../business/error/customError";
import BaseDatabase from "./baseDatabase";

const TABLE_NAME = 'PIXALABON_USERS'

export class UserDatabase extends BaseDatabase{
    public async createUser(input: any, id: string): Promise<void>{
        try{
           const {name, email, nickname, password } = input

             const data = await BaseDatabase.connection.raw(`
             INSERT INTO ${TABLE_NAME}(id, name, email, nickname, password)
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
}