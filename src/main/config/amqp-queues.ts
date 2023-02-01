import type RabbitmqServer from '@/infra/rabbitmq';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupAmqpAdapters = async (amqpConnection: RabbitmqServer): Promise<void> => {
  readdirSync(join(__dirname, '../queues')).map(async file => {
    (await import(`../queues/${file}`)).default(amqpConnection);
  });
};
