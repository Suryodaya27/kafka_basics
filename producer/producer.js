// producer/producer.js
const { Kafka } = require('kafkajs');

// Initialize Kafka instance
const kafka = new Kafka({
  clientId: 'my-producer-app',
  brokers: ['localhost:9092']  // Kafka broker address
});

// Create a producer instance
const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  
  // Send a message to the 'test-topic'
  for(let i = 0; i < 10; i++) {
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: `Hello Kafka from Producer1! Message ${i}` }
      ],
    });
  }

//   await producer.send({
//     topic: 'test-topic',
//     messages: [
//       { value: 'Hello Kafka from Producer1!' }
//     ],
//   });

  console.log('Message sent to Kafka');
  await producer.disconnect();
};

runProducer().catch(console.error);
