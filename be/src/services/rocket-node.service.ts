import { Op } from "sequelize";
import RocketNode, { RocketNodeInput, RocketNodeOutput } from "../models/rocket-node.model";
import RocketProperty from "../models/rocket-property.model";
import _ from 'lodash';

export class RocketNodeService {
  public async create(newNode: RocketNodeInput): Promise<RocketNode> {
    const resp = await RocketNode.create(newNode);
    return resp;
  } 

  public async findNodeFromPath(path: string): Promise<RocketNode|null> {
    return RocketNode.findOne({
      where: { path },
      include: [ { model: RocketProperty } ]
    });
  } 

  public async getJSONFromPath(path: string): Promise<object|null> {
    const childrenNodes = await RocketNode.findAll({
      where: { path: { [Op.like]: `${path}%` } },
      include: [ { model: RocketProperty } ]
    });
    if (childrenNodes.length > 0) {
      childrenNodes.sort((a,b) => a.path.length - b.path.length);
      const basePathLength = path.lastIndexOf('/')+1;
      const res = {};
      childrenNodes.forEach(node => {
        _.set(res, node.path.substring(basePathLength).replace(/\//g, "."), {});
        node.RocketProperties?.forEach((prop) => {
          _.set(res, node.path.substring(basePathLength).replace(/\//g, ".") + '.' + prop.name, prop.value);
        })
      })
      return res;
    }

    const leafNodePath = path.substring(0,path.lastIndexOf('/'));
    const propName = path.substring(path.lastIndexOf('/')+1);
    console.log(leafNodePath + ' : ' + propName);
    const leafNode = await this.findNodeFromPath(leafNodePath)
      .catch(e => console.error('error grabbing from path >> ', e));
    if (leafNode) {
      const prop = leafNode.RocketProperties?.find((p) => p.name === propName);
      const res = {};
      res[propName] = prop?.value;
      return res;
    }

    return null;
  }
}
