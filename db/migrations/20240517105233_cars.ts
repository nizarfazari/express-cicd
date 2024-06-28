import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.enum("size", ["small", "medium", "large"]).notNullable();
    table.string("name", 150).notNullable();
    table.float("price").notNullable().defaultTo(0);
    table.string("category", 255).notNullable();
    table.date("start_rent").notNullable();
    table.date("finish_rent").notNullable();
    table.string("image_url", 255);
    table.string("created_by", 255);
    table.string("updated_by", 255);

    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
