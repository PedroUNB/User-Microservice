import type RabbitmqServer from '@/infra/rabbitmq';
import { type Controller } from '@/interfaces/protocols/controller';

export const SERVICE_NAME_QUEUE: string = 'auth-service';

export const amqpAdapter = async (amqpConnection: RabbitmqServer, controller: Controller, queue: string): Promise<void> => {
  await amqpConnection.consume(queue, async (message) => {
    try {
      const request = await controller.handle(JSON.parse(message.content.toString()));
      if (request.statusCode !== 200) {
        await amqpConnection.publishInQueue(SERVICE_NAME_QUEUE, request.data.message);
      } else {
        await amqpConnection.publishInQueue(SERVICE_NAME_QUEUE, JSON.stringify(request.data));
      }
    } catch (err) {
      console.log(err);
    }
  });
};

export const amqpAdapterPublish = async (amqpConnection: RabbitmqServer, queue: string): Promise<void> => {
  try {
    await amqpConnection.publishInQueue('auth-service-login', queue);
  } catch (err) {
    console.log(err);
  }
};
