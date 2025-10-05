import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  
  app.enableCors({
    origin: '*', // Allow all for testing
  });
  
  // IMPORTANT: Change this line
  await app.listen(3001, '0.0.0.0'); // Add '0.0.0.0' to listen on all interfaces
  // NOT just: await app.listen(3000);
}
bootstrap();
