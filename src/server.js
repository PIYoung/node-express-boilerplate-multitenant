import app from './configs/express.config.js';

function bootstrap() {
  const port = process.env.PORT;
  const sever = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
