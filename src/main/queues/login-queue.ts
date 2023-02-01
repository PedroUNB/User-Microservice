import { makeLoginController } from '@/main/factories/controllers/login-controller-facotry';
import { amqpAdapter } from '@/main/adapters/amqp-adapter';
import type RabbitmqServer from '@/infra/rabbitmq';

const loginAdapter = async (amqpConnection: RabbitmqServer): Promise<any> => {
  await amqpAdapter(amqpConnection, makeLoginController(), 'auth-service-login');
};

export default loginAdapter;
