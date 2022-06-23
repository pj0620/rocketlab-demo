import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import RocketProperty from './rocket-property.model';

interface RocketNodeAttributes {
  id: number;
  name: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
  RocketProperties?: RocketProperty[]
}
export interface RocketNodeInput extends Optional<RocketNodeAttributes, 'id'|'createdAt'|'updatedAt'> {}
export interface RocketNodeOutput extends Required<RocketNodeAttributes> {}

class RocketNode extends Model<RocketNodeAttributes, RocketNodeInput> implements RocketNodeAttributes {
  public id!: number
  public name!: string
  public path!: string
  public RocketProperties?: RocketProperty[]

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RocketNode.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection
});

RocketNode.hasMany(RocketProperty, {
  foreignKey: 'nodeId'
});

export default RocketNode