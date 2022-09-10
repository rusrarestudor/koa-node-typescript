import  Koa from 'koa'
import  { DefaultContext, DefaultState} from "koa"
import { createKoaServer, useContainer} from 'routing-controllers'
import 'reflect-metadata'
import { MovieController, UserController } from "./src/controllers";
import { Container } from 'typedi';
import { services } from "./src/services";
import { config } from 'dotenv';

const PORT = 8000;
config()

const startApp = async () => {
  const app:Koa<DefaultState, DefaultContext> = createKoaServer({
    controllers: [MovieController, UserController],
  })
  
  services.forEach((service) => {
    Container.set(service, new service())
  })
  useContainer(Container)

  app.
  listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", (err: any) => {
    console.error(err);
  });
}

startApp();





