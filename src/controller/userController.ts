import { Request, Response} from 'express'
import { userInputDTO } from '../business/entities/user';
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { UserBusiness } from "../business/userBusiness";
import { UserDatabase } from '../data/userDatabase';

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDatabase()
)

export class UserController{
    public async signup(req: Request, res: Response){
        try{
            
            const input: userInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await userBusiness.signup(input)
            res
            .status(200)
            .send("Conta criada com sucesso! \n" + token)
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
}