import express from "express";
import { AddressInfo } from "net";
import { imageRouter } from "./controller/routes/imageRouter";
import { userRouter } from "./controller/routes/userRouter";
import { collectionRouter } from "./controller/routes/collectionRouter";
import cors from 'cors'

const app = express();


app.use(express.json());
app.use(cors())

app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use("/collection", collectionRouter);


const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});