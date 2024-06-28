import express from 'express';
import { login,register } from '../controller/user-controllers';
import { getCars, getCarskById } from '../controller/car-controller';


export const publicRouter = express.Router()

// USER API
publicRouter.post("/api/v1/register" , register)
publicRouter.post("/api/v1/login" , login)

// CAR api
publicRouter.get("/api/v1/cars", getCars);
publicRouter.get("/api/v1/cars/:id", getCarskById);