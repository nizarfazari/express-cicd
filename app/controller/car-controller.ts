import { Request, Response, NextFunction } from "express";

import { CarsModel } from "../model/car";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../middleware/cloudinary";
import { ErrorResponse } from "../errors/error-response";
import CarServices from "../services/car-services";
import { CarsValidation } from "../validation/car-validation";
import { User } from "../model/user";
type UserReq = {
  user : User
}

export async function getCars(req: Request , res: Response) {
  const { q } = req.query;
  const cars = await CarServices.list();

  return res.status(200).json({
    data: cars.data,
    count: cars.total,
  });
}

export async function getCarskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cars = await CarServices.getById(id);
    return res.status(200).json(cars);
  } catch (e) {
    return res.status(404).send("Data tidak ditemukan!");
  }
}

export async function deleteCars(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const cars = await CarServices.delete(id);
    return res.status(200).send({
      data: cars,
      message: "data berhasil di hapus",
    });
  } catch (e) {
    next(e)
  }
}

export async function addCars(req: any, res: Response, next: NextFunction) {
  try {
    const carRequest = req.body;
    carRequest.created_by = req.user.nama
    console.log(req.file)
    const car = await CarServices.create(carRequest, req.file);

    res.status(201).json({
      data: car,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCars(req: any, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const carRequest = req.body;
    carRequest.updated_by = req.user.nama
    const car = await CarServices.update(id,carRequest,req.file)
    console.log(car)
    res.status(201).json({
      data: car,
    });
  } catch (e) {
    next(e)
  }
}
