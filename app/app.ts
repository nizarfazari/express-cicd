import express, { Express } from "express";
import knex from "knex";
import { Model } from "objection";
import { publicRouter } from "./route/public-api";
import { errorMiddleware } from "./middleware/error-middlewate";
import path from "path";
import { apiRouter } from "./route/api";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../openapi.json';
import cors  from 'cors'

export const app: Express = express();
//knex
const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "cars_db",
    user: "postgres",
    password: "root",
  },
});

Model.knex(knexInstance);
app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(cors());
publicRouter.use('/api/v1/api-docs', swaggerUi.serve);
publicRouter.get('/api/v1/api-docs', swaggerUi.setup(swaggerDocument));



app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);
