import RocketProperty, { RocketPropertyInput, RocketPropertyOutput } from "../models/rocket-Property.model";

export class RocketPropertyService {
  public async create(newProperty: RocketPropertyInput): Promise<RocketPropertyOutput> {
    const resp = await RocketProperty.create(newProperty);
    return resp;
  }
}
