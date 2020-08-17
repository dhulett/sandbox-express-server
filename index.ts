import dotenv from 'dotenv';
import { startServer } from './server';

dotenv.config();

startServer(process.env.PORT || 3000, process.env.PLUGINS_DIR || './plugins');
