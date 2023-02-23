import app from './configs/express.config';
import logger from './configs/logger.config';
import { connectPostgres } from './configs/postgres.config';
import { configDotenv } from './configs/dotenv.config';

const readMemory = () => {
  const memory = process.memoryUsage();
  const convert = {
    Kb: (n: number) => n / 1024,
    Mb: (n: number) => convert.Kb(n) / 1024,
    Gb: (n: number) => convert.Mb(n) / 1024,
  };
  const toHuman = (n: number, t: keyof typeof convert) => `${convert[t](n).toFixed(2)}${t}`;
  return `Used ${toHuman(memory.heapUsed, 'Mb')} of ${toHuman(memory.heapTotal, 'Mb')} - RSS: ${toHuman(
    memory.rss,
    'Mb',
  )}`;
};

const bootstrap = async () => {
  try {
    const port = Number(process.env['PORT']) || 3000;

    await connectPostgres();

    app.listen(port, () => {
      logger.info(`🚀 Server is running on port ${port}`);
      logger.info(`🚀 Starting server... ${readMemory()}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

configDotenv();
bootstrap();
