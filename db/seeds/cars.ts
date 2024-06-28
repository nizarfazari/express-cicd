import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex("cars").del();

  // Inserts seed entries
  // await knex("cars").insert([
  //   {
  //     id: 1,
  //     size: "small",
  //     name: "Suzuki",
  //     price: 2000,
  //     category: "Kategori0",
  //     start_rent: new Date().toISOString().split("T")[0], // 'YYYY-MM-DD'
  //     finish_rent: new Date().toISOString().split("T")[0], // 'YYYY-MM-DD'
  //     image_url: "asdas",
  //   },
  // ]);
}
