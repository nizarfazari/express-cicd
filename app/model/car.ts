import { Model, ModelObject } from "objection";

enum size_car {
  "small",
  "medium",
  "large",
}

export class CarsModel extends Model {
  id!: number;
  size!: size_car;
  name!: string;
  price!: number;
  category!: string;
  start_rent!: Date;
  finish_rent!: Date;
  image_url!: string;
  created_by!: string;
  updated_by!: string;


  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
