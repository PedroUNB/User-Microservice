import RabbitmqServer from '@/infra/rabbitmq';
import amqplib, { type Channel } from 'amqplib';

jest.mock('amqplib', () => {
  return {
    connect: jest.fn().mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue({
        assertQueue: jest.fn().mockResolvedValue({ queue: 'test_queue' }),
        consume: jest.fn().mockReturnValue(Promise.resolve()),
        ack: jest.fn(),
        sendToQueue: jest.fn(),
        close: jest.fn()
      }),
      close: jest.fn()
    })
  };
});

describe('RabbitMQ class', () => {
  let mockConsume: jest.Mock;
  let rabbitMQ: RabbitmqServer;
  let mockChannel: Channel;

  beforeEach(async () => {
    mockConsume = jest.fn();
    rabbitMQ = new RabbitmqServer('amqp://localhost');
    await rabbitMQ.start();
    mockChannel = rabbitMQ.channel;
    mockChannel.consume = mockConsume;
  });

  afterEach(async () => {
    await rabbitMQ.closeConnection();
  });

  it('publishes a message to a queue', async () => {
    const queue = 'test_queue';
    const message = 'test message';

    await rabbitMQ.publishInQueue(queue, message);

    expect(amqplib.connect).toHaveBeenCalledWith('amqp://localhost');
    expect(rabbitMQ.conn.createChannel).toHaveBeenCalled();
    expect(rabbitMQ.channel.sendToQueue).toHaveBeenCalledWith(queue, expect.any(Buffer));
  });

  it('should consume messages from the queue', async () => {
    const callback = jest.fn();
    await rabbitMQ.consume('queue', callback);
    expect(mockChannel.consume).toHaveBeenCalledWith('queue', expect.any(Function));
  });

  it('should acknowledge the message after consuming', async () => {
    const callback = jest.fn();
    await rabbitMQ.consume('queue', callback);
    const message = { content: Buffer.from('message') };
    await mockConsume.mock.calls[0][1](message);
    expect(mockChannel.ack).toHaveBeenCalledWith(message);
  });

  it('closes the connection to the RabbitMQ server', async () => {
    await rabbitMQ.closeConnection();

    expect(rabbitMQ.channel.close).toHaveBeenCalled();
    expect(rabbitMQ.conn.close).toHaveBeenCalled();
  });
});
