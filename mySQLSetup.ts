import BaseDatabase from "./src/controller/baseDatabase";

class mySQLSetup extends BaseDatabase{
    public async createTable(): Promise<void>{
        try{
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS PIXALABON_USERS(

                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(150),
                email VARCHAR(150) NOT NULL UNIQUE,
                nickname VARCHAR(150) UNIQUE NOT NULL,
                password VARCHAR(150) NOT NULL,
                role enum('NORMAL','ADMIN') DEFAULT "NORMAL"
            )`)
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS PIXALABON_IMAGES(

                    id VARCHAR(255) PRIMARY KEY,
                    subtitle VARCHAR(255),
                    author VARCHAR(255) NOT NULL,
                    date DATE,
                    file VARCHAR(255),
                    tags VARCHAR(255),
                    collection VARCHAR(255)
                )
            `)
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS PIXALABON_TAGS(

                    id VARCHAR(255) PRIMARY KEY,
                    tag_name VARCHAR(255) NOT NULL,
                    user_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES PIXALABON_USERS (id)
                )
            `)
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS PIXALABON_TAG_IMAGE(

                    id VARCHAR(255) PRIMARY KEY,
                    image_id VARCHAR(255) NOT NULL,
                    tag_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (image_id) REFERENCES PIXALABON_IMAGES (id),
                    FOREIGN KEY (tag_id) REFERENCES PIXALABON_TAGS (id)
                )
            `)
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS PIXALABON_COLLECTION(

                    id VARCHAR(255) PRIMARY KEY,
                    collection_name VARCHAR(255) NOT NULL,
                    user_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES PIXALABON_USERS (id)
                )
            `)
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS PIXALABON_COLLECTION_IMAGE(

                    id VARCHAR(255) PRIMARY KEY,
                    collection_id VARCHAR(255) NOT NULL,
                    image_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (collection_id) REFERENCES PIXALABON_COLLECTION (id),
                    FOREIGN KEY (image_id) REFERENCES PIXALABON_IMAGES (id)

                )
            `)
            console.log("Setup completed!")
        }
        catch(e){
            throw new Error(e.sqlMessage || e.message)
        }
    }
}
new mySQLSetup().createTable()
