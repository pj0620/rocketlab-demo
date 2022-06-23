import 'dotenv/config';
import RocketNode from './models/rocket-node.model';
import RocketProperty from './models/rocket-property.model';
const isDev = process.env.NODE_ENV === 'development';
(async () => {
  try {
    await RocketNode.sync({ alter: isDev });
    await RocketProperty.sync({ alter: isDev });
  }
  catch (e) {
    console.error('error settingup db >> ', e);
  }
})()
