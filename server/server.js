import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  schema {
    query: Query
  }

  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => 'Hello world!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors(),
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server,),
);

await new Promise((resolve) => httpServer.listen({ port: 9000 }, resolve));
console.log(`🚀 Server ready at http://localhost:9000/`);
