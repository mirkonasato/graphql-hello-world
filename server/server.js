import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;
