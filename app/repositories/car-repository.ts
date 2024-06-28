import { MaybeCompositeId } from "objection";
import { Cars, CarsModel } from "../model/car";

export default class CarsRepostory {
  static async create(createArgs: Cars) {
    return CarsModel.query().insert(createArgs).returning("*");
  }

  static async list() {
    const query = CarsModel.query();
    const [total, data] = await Promise.all([
      query.resultSize(),
      query.select(),
    ]);

    return {
      data,
      total,
    };
  }

  static async delete(id: MaybeCompositeId) {
    return CarsModel.query().deleteById(id).throwIfNotFound();
  }

  static async findById(id: MaybeCompositeId) {
    return CarsModel.query().findById(id).throwIfNotFound();
  }

  static async update(id: MaybeCompositeId, updateArgs: Cars){
    return CarsModel.query()
        .where({ id })
        .patch(updateArgs)
        .throwIfNotFound()
        .returning("*");
}
}
