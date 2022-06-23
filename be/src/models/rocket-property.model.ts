import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface RocketPropertyAttributes {
  id: number;
  name: string;
  value: number;
  nodeId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface RocketPropertyInput extends Optional<RocketPropertyAttributes, 'id'> {}
export interface RocketPropertyOutput extends Required<RocketPropertyAttributes> {}

class RocketProperty extends Model<RocketPropertyAttributes, RocketPropertyInput> implements RocketPropertyAttributes {
  public id!: number
  public name!: string
  public value!: number
  public nodeId!: number

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

RocketProperty.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  nodeId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {     
      model: 'RocketNodes',
      key: 'id'
    }
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

export default RocketProperty