import { Kafka } from 'kafkajs';
import { config } from 'dotenv';
config();

const kafkaBroker = process.env.KAFKA_BROKER ?? 'localhost:9092';
const kafka = new Kafka({
  clientId: 'express-consumer',
  brokers: [kafkaBroker],
});

const consumer = kafka.consumer({ groupId: 'my-group' });

(async () => {
  const topic = 'my-topic';
  await consumer.connect();
  await consumer.subscribe({
    topics: [topic],
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log(`${topic}: ${message.value?.toString()}`);
    },
  });
})();
