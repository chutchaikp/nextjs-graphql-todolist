// import '../styles/globals.css'
// import { UserProvider } from '@auth0/nextjs-auth0';
// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <UserProvider>
//       <Component {...pageProps} />
//     </UserProvider>
//   )
// }
// export default MyApp

import '../styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app';

import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { UserProvider } from '@auth0/nextjs-auth0';

//#region ui config 
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

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

  // debugger;

  // if (!pageProps.graphQlConnection) {
  return (
    <UserProvider >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
  // }


  debugger;

  const { user } = pageProps;
  let client = MyApolloClient(pageProps);

  return (
    <UserProvider user={user}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </UserProvider>
  );

}

let _client: any;
let _token: any;

export function MyApolloClient(pageProps: any) {
  // let _client = null;
  debugger;

  try {
    const { jwt, url, } = pageProps.graphQlConnection;

    if (jwt === _token) {
      return _client;
    }

    _token = jwt;

    const httpLink = createHttpLink({
      uri: url + '/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      // const token = localStorage.getItem('token');
      // console.log(token);
      return {
        headers: {
          ...headers,
          authorization: _token ? `Bearer ${_token}` : "",
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

  } catch (error) {
    debugger;

  }

  return _client;

}

