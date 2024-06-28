import { Knex } from "knex";
import { encryptPassword } from "../../app/utils/encrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
//   await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      nama: "test",
      email: "test12@gmail.com",
      password: await encryptPassword("test123"),
      avatar: "test",
      role: "super-admin",
    },
  ]);
}
