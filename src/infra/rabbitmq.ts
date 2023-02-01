import { type Channel, connect, type Connection, type ConsumeMessage } from 'amqplib';

export default class RabbitmqServer {
  conn: Connection;
  channel: Channel;

  constructor (private readonly uri: string) {}

  async start (): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue (queue: string, message: string): Promise<any> {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume (queue: string, callback: (message: ConsumeMessage) => Promise<void>): Promise<any> {
    return await this.channel.consume(queue, (message) => {
      // @ts-expect-error atualmente o callback espera null mas o ark espera um consumeMessage
      void callback(message);
      // @ts-expect-error atualmente o callback espera null mas o ark espera um consumeMessage
      this.channel.ack(message);
    });
  }

  async closeConnection (): Promise<void> {
    await this.channel.close();
    await this.conn.close();
  }
}
