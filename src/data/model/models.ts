import { Collection } from "../../business/entities/collection";
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
   };
   public static toCollectionModel(id: any, collection_name: any, user_id: any): Collection{
      return new Collection(
         id,
         collection_name,
         user_id
      );
   };
}