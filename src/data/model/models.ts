import { Collection } from "../../business/entities/collection";
import { User } from "../../business/entities/user";
import { Image } from "../../business/entities/image";

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
   public static toImageModel(image: any)
   {
      return(
         image.id,
         image.subtitle,
         image.author,
         image.date,
         image.file,
         image.collection,
         image.name, 
         image.email,
         image.nickname,
         image.password,
         image.role
      );
   };
}