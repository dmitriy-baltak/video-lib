import dotenv from 'dotenv';
import { startGrpcServer } from './grpc/server.js';
import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const grpcServer = startGrpcServer();

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3007', 10);
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const shutdown = async () => {
  grpcServer.tryShutdown((err) => {
    if (err) {
      grpcServer.forceShutdown();
    }
  });

  await app.close();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
