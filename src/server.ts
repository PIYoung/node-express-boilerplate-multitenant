import logger from './configs/logger.config';
import { configDotenv } from './configs/dotenv.config';
import { connectPostgres } from './configs/postgres.config';

const readMemory = () => {
  const convert = {
    Kb: (n: number) => n / 1024,
    Mb: (n: number) => convert.Kb(n) / 1024,
    Gb: (n: number) => convert.Mb(n) / 1024,
  };
  const memory = process.memoryUsage();
  const toHuman = (n: number, t: keyof typeof convert) => `${convert[t](n).toFixed(2)}${t}`;

  return `Used ${toHuman(memory.heapUsed, 'Mb')} of ${toHuman(memory.heapTotal, 'Mb')} - RSS: ${toHuman(
    memory.rss,
    'Mb',
  )}`;
};

const bootstrap = async () => {
  // lazy import required to avoid dotenv config before it's loaded
  const app = (await import('./configs/express.config')).default;
  const port = Number(process.env['PORT']) || 3000;

  await connectPostgres();

  const server = app.listen(port, () => {
    logger.info(`🚀 Server is running on port ${port}`);
    logger.info(`🚀 Starting server... ${readMemory()}`);
  });

  process.on('SIGINT', () => {
    logger.info(`👻 Server is shutting down...`);
    server.close();
    process.exit(0);
  });
};

configDotenv();
bootstrap();
