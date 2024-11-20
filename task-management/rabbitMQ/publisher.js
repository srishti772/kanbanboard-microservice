const amqp = require("amqplib/callback_api");

const publishToExchange = (exchangeName, routingkey, message) => {
  let url = process.env.RABBITMQ_HOST;
  console.log("rabbitmq url", url);
  amqp.connect(url, (err, connection) => {
    if (err) throw err;

    connection.createChannel((err, channel) => {
      if (err) throw err;

      channel.assertExchange(exchangeName, 'topic' , { durable: false });
      channel.publish(exchangeName, routingkey, Buffer.from(message), {
        persistent: true,
      });
      console.log(`Message sent to exchange: ${message}`);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = { publishToExchange };
