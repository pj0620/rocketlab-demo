import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const rocket:DataNode = {
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

app.get('*', function(req, res, next) {
  let curNode: DataNode|number|undefined = rocket;
  const path = req.url.split('/');
  for (let i=1; i < path.length; i++) {
    if (!curNode) {
      res.status(404).send('Not found');
      return;
    }
    curNode = typeof curNode === 'number'
      ? undefined
      : curNode?.[path[i]];
  }
  res.send(JSON.stringify(curNode));
});

app.post('*', function(req, res, next) {
  let curNode: DataNode = rocket;
  const path = req.url.split('/');
  for (let i=1; i < path.length-1; i++) {
    if (!curNode[path[i]] || typeof curNode[path[i]] === 'number') {
      curNode[path[i]] = {};
    }
    curNode = curNode[path[i]] as DataNode;
  }
  curNode[path[path.length-1]] = req.body || {};
  res.send(JSON.stringify(curNode[path[path.length-1]]));
});

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});