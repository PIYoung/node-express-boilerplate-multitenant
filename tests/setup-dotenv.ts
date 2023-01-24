import appRootPath from 'app-root-path';
import dotenv from 'dotenv';
import { join } from 'path';

const { path } = appRootPath;

dotenv.config();
dotenv.config({ path: join(path, '.env.test') });
