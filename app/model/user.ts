import { Model, ModelObject } from "objection";

export class UserModel extends Model {
  id!: number;
  nama!: string;
  email!: string;
  password!: string;
  avatar!: string;
  role!: string;
  created_at!: string;
  updated_at!: string;

  static get tableName() {
    return "users";
  }
}

export type RequestUserRegister = {
  nama: string;
  email: string;
  password: string;
  avatar: string;
  role : string;
};

export type RequestUserLogin = {
  email: string;
  password: string;
};

export type User = ModelObject<UserModel>;
