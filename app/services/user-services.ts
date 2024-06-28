import { ErrorResponse } from "../errors/error-response";
import { RequestUserLogin, RequestUserRegister, User } from "../model/user";
import UserRepository from "../repositories/user-repository";
import { checkPassword, createToken, encryptPassword } from "../utils/encrypt";

export default class UserServices {
  static async login(request: RequestUserLogin) {
    const user: User | null = await UserRepository.findEmail(request.email);

    if (!user) {
      throw new ErrorResponse(404, "Email tidak ditemukan");
    }
    const isPasswordCorrect = await checkPassword(
      user.password,
      request.password
    );

    if (!isPasswordCorrect) {
      throw new ErrorResponse(401, "Password salah!");
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });

    return {
      id: user.id,
      email: user.email,
      nama: user.nama,
      token: token,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  static async register(request: RequestUserRegister) {
    const isEmailExists: User | null = await UserRepository.findEmail(
      request.email
    );
    if (isEmailExists) {
      throw new ErrorResponse(400, "Email sudah terdaftar!");
    }
    try {
      const encryptedPassword = await encryptPassword(request.password);
      const user = await UserRepository.create({
        ...request,
        password: encryptedPassword,
      });

      return {
        email : user.email,
        nama : user.nama,
        avatar : user.avatar,
      };
    } catch (e) {
      throw new ErrorResponse(500, "Gagal Mendaftar");
    }
  }
}
