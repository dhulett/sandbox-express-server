import express from 'express';
import cors from 'cors';

import apis from './api';
import PluginLoader from './plugins';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/v1', apis);


export async function startServer(port: number | string, pluginsDir: string) {
  const plugins = new PluginLoader('/plugins', app);
  plugins.addPluginDir(pluginsDir);
  await plugins.loadAllPlugins();
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};
