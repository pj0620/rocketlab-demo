import 'dotenv/config';
import { RocketNodeService, RocketPropertyService } from './services';

const rocketNodeService = new RocketNodeService();
const rocketPropertyService = new RocketPropertyService();

const seedTree = async (tree: object, path: string) => {
  const keys = Object.keys(tree);
  const rocketNode = await rocketNodeService.create({
    path,
    name: path.split('/')[path.split('/').length - 1] || 'Root'
  })
    .catch(e => console.error('error getting rocket node for path >> ', e));
  for (let i = 0; i < keys.length; i++) {
    if (typeof tree[keys[i]] === 'object') {
      seedTree(tree[keys[i]], path + '/' + keys[i]);
    }
    else {
      await rocketPropertyService.create({
        name: keys[i],
        value: tree[keys[i]],
        nodeId: rocketNode!.id
      })
    }
  }
}

const rocket = {
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
seedTree(rocket, '');