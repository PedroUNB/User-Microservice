import { setupApp } from '@/main/config/app';
import RabbitmqServer from '@/infra/rabbitmq';

export const RABBITMQ_URI: string = 'amqp://guest:guest@localhost:5672';

const amqpConnection = new RabbitmqServer(RABBITMQ_URI);

void amqpConnection.start().then(async () => {
  const app = await setupApp(amqpConnection);
  app.listen(5000, () => {
    console.log('server is ranning');
  });
}).catch(console.error);
