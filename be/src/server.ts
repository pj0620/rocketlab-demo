import 'dotenv/config';
import express from 'express';
import { RocketNodeService, RocketPropertyService } from './services';

const app = express();
const PORT = 3000;

app.use(express.json());

const rocketNodeService = new RocketNodeService();
const rocketPropertyService = new RocketPropertyService();

app.get('*', async (req, res, next) => {
  try {
    const json = await rocketNodeService.getJSONFromPath(req.url);
    res.send(JSON.stringify(json));
  }
  catch (e) {
    console.error(e);
    res.status(500).send('Error grabbing graph');
  }
});

app.post('*', async (req, res, next) => {
  try {
    let rocketNode = await rocketNodeService.findNodeFromPath(req.url);
    if (!rocketNode) {
      rocketNode = await rocketNodeService.create({
        path: req.url,
        name: req.url.split('/')[req.url.split('/').length-1] as string
      });
    }

    if (!rocketNode?.id) {
      console.error('error creating rocket node');
      return;
    }

    if (req.body) {
      const keys = Object.keys(req.body);
      for (let i = 0; i < keys.length; i++) {
        await rocketPropertyService.create({
          name: keys[i],
          value: req.body[keys[i]],
          nodeId: rocketNode.id
        });
      }
    } 

    const json = await rocketNodeService.getJSONFromPath(req.url);
    res.send(JSON.stringify(json));
    // res.send('bbtuh');
  }
  catch(e) {
    console.error(e);
    res.status(500).send('Error inserting into db');
  }
});

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});