const amqp = require('amqplib/callback_api');

const setupRabbitMQ = () => {
  let url = process.env.RABBITMQ_HOST;

  amqp.connect(url, (err, connection) => {
    if (err) throw err;

    connection.createChannel((err, channel) => {
      if (err) throw err;

      const exchangeName = 'task_exchange';
      const queueName = 'task_notification';
      const routingKey1 = 'created';
      const routingKey2 = 'updated';

      // Step 1: Create exchange
      channel.assertExchange(exchangeName, 'direct', { durable: false });

      // Step 2: Create queue
      channel.assertQueue(queueName, { durable: false });


      // Step 3: Bind queue to exchange with routing key
      channel.bindQueue(queueName, exchangeName, routingKey1);
      channel.bindQueue(queueName, exchangeName, routingKey2);

      console.log('Exchange, Queue, and Binding setup successfully');
      
      // Close connection after setup
      setTimeout(() => connection.close(), 500);
    });
  });
};

module.exports = { setupRabbitMQ };
