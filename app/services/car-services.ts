import { ValidationResult } from "joi";
import { ErrorResponse } from "../errors/error-response";
import cloudinary from "../middleware/cloudinary";
import { Cars } from "../model/car";
import CarsRepostory from "../repositories/car-repository";
import { CarsValidation } from "../validation/car-validation";

export default class CarServices {
  static async create(requestBody: Cars, requestFile : any) {
    const { value, error } = CarsValidation.CREATE.validate(requestBody,  { abortEarly: false });
    if(error){
      throw new ErrorResponse(400, error.details.map(detail => detail.message).join(','))
    }
    const fileUplaod = await this.upload(requestFile);
    return CarsRepostory.create({
      ...value,
      image_url : fileUplaod
    });
  }
  static async update(idCarsUpdate : number | string , requestBody: Cars, requestFile : any) {
    const { value, error } = CarsValidation.UPDATE.validate(requestBody,  { abortEarly: false });
    if(error){
      throw new ErrorResponse(400, error.details.map(detail => detail.message).join(','))
    }
    try {

    const car = await CarsRepostory.findById(idCarsUpdate);
    if(car){
      if(!requestFile){
        return CarsRepostory.update(idCarsUpdate , {
         ...value,
       });
     }
     const fileUplaod = await this.upload(requestFile);
     return CarsRepostory.update(idCarsUpdate , {
       ...value,
       image_url : fileUplaod
     });
    }

   
    } catch (error) {
      throw new ErrorResponse(404, "Cars Not Found");
    }
  }

  static async list(){
    const cars = await CarsRepostory.list()
   return cars
  }
  


  static async getById(idCars : string | number){

    const car = await CarsRepostory.findById(idCars)

    return car
  }


  static async delete(idCars: string | number){
    try {
      const car = await CarsRepostory.findById(idCars);
      await CarsRepostory.delete(idCars)
      return car
    } catch (error) {
      throw new ErrorResponse(404, "Cars Not Found");
    }

  }

  static async  upload(file: any) {
    try {
      const fileBase64 = file?.buffer.toString("base64");
      const fileString = `data:${file?.mimetype};base64,${fileBase64}`;
      console.log(file)
      const result = await cloudinary.uploader.upload(fileString);
      return result.url;
    } catch (e) {
      throw new ErrorResponse(400, "Gagal upload pada cloudinary");
    }
  }
}
