import { User, UserModel } from "../model/user";

export default class UserRepository {
  static async findEmail(email: string) : Promise<User | null> {
    const user = await UserModel.query().findOne({ email });

    return user || null
  }


  static async create(user : any){
   return await UserModel.query().insert(user).returning("*");
  }
}
