import { User } from "../../business/entities/user";

export class Model{
    public static toUserModel(user: any): User {
        return new User(
           user.id,
           user.name,
           user.email,
           user.nickname,
           user.password,
           user.role
        );
     }
}