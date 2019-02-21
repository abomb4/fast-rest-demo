import fastifyCreate from 'fastify';
import mongoose from 'mongoose';
import User from './model/user';
import routes from './routes';

const fastify = fastifyCreate({ logger: true });

// Require external modules
// Connect to DB
mongoose.connect('mongodb://localhost/fast_rest')
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))

// Declare a route
routes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
