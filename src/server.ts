import app from './configs/express.config';

import logger from './configs/logger.config';
import { connectPostgres } from './configs/postgres.config';
import { configDotenv } from './configs/dotenv.config';

const bootstrap = async () => {
  try {
    const port = Number(process.env['PORT']) || 3000;

    await connectPostgres();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

configDotenv();
bootstrap();
