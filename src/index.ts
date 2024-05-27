import express from 'express';
import { Kafka } from 'kafkajs';
import { config } from 'dotenv';
import { producerRoute } from './producer';
config();

const app = express();
const port = 3000;
const kafkaBroker = process.env.KAFKA_BROKER ?? 'localhost:9092';

const kafka = new Kafka({
  clientId: 'express-producer',
  brokers: [kafkaBroker],
});

export const producer = kafka.producer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/produce', producerRoute);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
