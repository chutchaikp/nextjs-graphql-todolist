import '../styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app';

import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { UserProvider } from '@auth0/nextjs-auth0';

//#region ui config 
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { __DirectiveLocation } from 'graphql';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
  cssVarPrefix: "chutchaikp",
}

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
})

// 3. extend the theme
const theme = extendTheme({
  config,
  breakpoints
})
//#endregion
//#endregion

export default function App({ Component, pageProps }: AppProps): React.ReactElement<AppProps> {

  if (!pageProps.graphQlConnection) {
    return (
      <UserProvider >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    );
  }

  const client = MyApolloClient(pageProps);

  return (
    <UserProvider >
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

let _client: any;

export function MyApolloClient(pageProps: any) {
  try {
    const { token, graphql_base_url, } = pageProps.graphQlConnection;
    const httpLink = createHttpLink({
      uri: graphql_base_url + '/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    const defaultOptions: DefaultOptions = {
      watchQuery: { fetchPolicy: 'no-cache', errorPolicy: 'ignore', },
      query: { fetchPolicy: 'no-cache', errorPolicy: 'all', },
    }

    _client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });

    return _client;

  } catch (error) {
    debugger;
    return _client;
  }
}

