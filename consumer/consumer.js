// consumer/consumer.js
const { Kafka } = require('kafkajs');

// Initialize Kafka instance
const kafka = new Kafka({
  clientId: 'my-consumer-app',
  brokers: ['localhost:9092']  // Kafka broker address
});

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'my-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // Read messages from the topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

runConsumer().catch(console.error);
