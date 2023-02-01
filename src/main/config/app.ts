import express, { type Express } from 'express';
import type RabbitmqServer from '@/infra/rabbitmq';
import setupRoutes from './routes';
import { setupAmqpAdapters } from '@/main/config/amqp-queues';

export const setupApp = async (amqpConnection: RabbitmqServer): Promise<Express> => {
  // TODO: Remove debug consumer
  await amqpConnection.consume('auth-service', async message => {
    console.log(message?.content.toString());
  });

  await setupAmqpAdapters(amqpConnection);
  const app = express();
  app.use(express.json());
  setupRoutes(app);
  return app;
};
