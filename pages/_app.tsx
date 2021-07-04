import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';

// require('dotenv').config()

import theme from './themes/theme'
import { setContext } from '@apollo/client/link/context';

const { REACT_APP_GRAPHQL_SCHEMA } = process.env;

console.log(REACT_APP_GRAPHQL_SCHEMA)

const httpLink = createHttpLink({
  uri: REACT_APP_GRAPHQL_SCHEMA,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // const token = getTokens();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}
export default MyApp
