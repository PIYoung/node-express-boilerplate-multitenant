import app from './config/express.config.js';

const port = process.env.PORT;

function bootstrap() {
  const sever = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
