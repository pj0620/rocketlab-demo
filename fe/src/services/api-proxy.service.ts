import _ from 'lodash';
import { RocketNodeI } from '../types';

const rocket:RocketNodeI = {
  Rocket: {
    Height: 18.0,
    Mass: 12000.0,
    Stage1: {
      Engine1: {
        Thrust: 9.493,
        ISP: 12.156
      },
      Engine2: {
        Thrust: 9.413,
        ISP: 11.632
      },
      Engine3: {
        Thrust: 9.899,
        ISP: 12.551
      }
    },
    Stage2: {
      Engine1: {
        Thrust: 1.622,
        ISP: 15.110
      }
    }
  }
};

export class APIProxyService {
  public async getFromPath(path:string):Promise<RocketNodeI|number|null> {
    if (path === '/') {
      return rocket;
    }
    console.log({path: path.substring(1).replace(/\//g, "."), res: _.get(rocket, path.substring(1).replace(/\//g, "."))})
    return _.get(rocket, path.substring(1).replace(/\//g, "."));
  }
  
  public async setFromPath(path:string, value: RocketNodeI|number): Promise<RocketNodeI|number> {
    _.set(rocket, path.replace(/\//g, "."), value);
    return _.get(rocket, path.replace(/\//g, "."));
  }
}