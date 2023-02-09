import app from './configs/express.config';

async function bootstrap() {
  const { PORT: port } = process.env;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
