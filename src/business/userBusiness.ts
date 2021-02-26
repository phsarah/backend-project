import { UserDatabase } from "../data/userDatabase";
import { loginInputDTO, userInputDTO } from "./entities/user";
import { CustomError } from "./error/customError";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class UserBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDatabase: UserDatabase
    ) { }
    public async signup(input: userInputDTO){
        
        if(!input.name){
            throw new CustomError(417, "Invalid name")
        }
        if(!input.nickname){
            throw new CustomError(417, "Invalid nickname")
        }
        if(!input.email || input.email.indexOf("@") === -1){
            throw new CustomError(417, "Invalid email")
        }
        if(input.password.length < 6){
            throw new CustomError(417, "Invalid password, must be at least 6 characters")
        }

        const id = this.idGenerator.generate()
        const encryptedPassword = await this.hashManager.hash(input.password as string)

        const newInput = {
            ...input,
            password: encryptedPassword 
        }

        await this.userDatabase.createUser(newInput, id)

        const token = this.authenticator.generateToken({id})

        return token
    }
    public async login(input: loginInputDTO){

        if(!input.emailOrNickname){
            throw new CustomError (417, "Invalid input email or nickname")
        }
        if(!input.password){
            throw new CustomError(417, "Invalid input password")
        }
        
        const data = await this.userDatabase.getUserByEmailOrNickname(input.emailOrNickname)

        if(!data){
            throw new CustomError(404, "User not found")
        }

        const compareHashPassword = await this.hashManager.compare(input.password, data.password)
      
        if(compareHashPassword == true){
            const id: string = data.id
            const token =  this.authenticator.generateToken({id})
            return token
        }
        else{
            throw new CustomError(401, "Incorrect password, try again")
        }
    }
}