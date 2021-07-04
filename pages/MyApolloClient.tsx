import { ApolloClient, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const { REACT_APP_GRAPHQL_SCHEMA } = process.env;
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
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
