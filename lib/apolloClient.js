// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_PAGES_ENDPOINT } from "@/utils/constants/endpoints";

const client = new ApolloClient({
  uri: GET_PAGES_ENDPOINT, // replace with your actual endpoint
  cache: new InMemoryCache(),
});

export default client;
