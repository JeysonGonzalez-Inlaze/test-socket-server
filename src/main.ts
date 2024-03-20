import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ChatGateway } from './chat/chat.gateway';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  /* Hybrid App */
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: { brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9092'] },
  //     consumer: {
  //       groupId: process.env.KAFKA_GROUP_ID ?? 'app-microservices',
  //     },
  //   },
  // });
  // await app.startAllMicroservices();
  // await app.listen(3001);

  /* Microservice */
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: { brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9092'] },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID ?? 'app-microservices',
        },
      },
    },
  );
  await app.listen();

  // Create Nest.js application instance for WebSocket
  const wsApp = await NestFactory.create(ChatGateway);
  wsApp.enableCors({
    origin: 'http://localhost:3002', // Permite solicitudes solo desde http://localhost:3002
  });
  app.useWebSocketAdapter(new IoAdapter(app));

  // Start WebSocket server
  await wsApp.listen(3001); // Adjust port as needed
}
bootstrap();
