import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
export default MyApp



// import '../styles/globals.css'
// // import './styles.css'
// import { Provider } from 'next-auth/client'
// import type { AppProps } from 'next/app'
// import React from 'react'
// import { ChakraProvider } from '@chakra-ui/react'
// import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';

// // require('dotenv').config()
// // import theme from './themes/theme'

// import { setContext } from '@apollo/client/link/context';

// //#region theme
// // 1. import `extendTheme` function
// import { extendTheme, ThemeConfig } from "@chakra-ui/react"
// import { createBreakpoints } from "@chakra-ui/theme-tools"

// // 2. Add your color mode config
// const config: ThemeConfig = {
//   initialColorMode: "light",
//   useSystemColorMode: true,
//   cssVarPrefix: "chutchaikp",
// }

// const breakpoints = createBreakpoints({
//   sm: "320px",
//   md: "768px",
//   lg: "960px",
//   xl: "1200px",
// })

// // 3. extend the theme
// const theme = extendTheme({
//   config,
//   breakpoints
// })
// //#endregion

// let _client: any;
// let _token: any;

// function MyApp({ Component, pageProps }: AppProps) {

//   return (
//     <ChakraProvider theme={theme}>
//       <Component {...pageProps} />
//     </ChakraProvider>
//   )

//   debugger;

//   if (!_client && !pageProps.graphQlConnection) {
//     return (
//       <ChakraProvider theme={theme}>
//         <Component {...pageProps} />
//       </ChakraProvider>
//     )
//   }

//   let client = MyApolloClient(pageProps);

//   return (
//     <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session} >
//       <ApolloProvider client={client}>
//         <ChakraProvider theme={theme}>
//           <Component {...pageProps} />
//         </ChakraProvider>
//       </ApolloProvider>
//     </Provider>
//   )
// }

// export default MyApp


// export function MyApolloClient(pageProps: any) {
//   // let _client = null;
//   debugger;


//   try {
//     const { jwt, url, } = pageProps.graphQlConnection;

//     if (jwt === _token) {
//       return _client;
//     }

//     _token = jwt;

//     const httpLink = createHttpLink({
//       uri: url + '/graphql',
//     });

//     const authLink = setContext((_, { headers }) => {
//       // get the authentication token from local storage if it exists
//       // const token = localStorage.getItem('token');
//       // console.log(token);
//       return {
//         headers: {
//           ...headers,
//           authorization: _token ? `Bearer ${_token}` : "",
//         }
//       }
//     });

//     const defaultOptions: DefaultOptions = {
//       watchQuery: { fetchPolicy: 'no-cache', errorPolicy: 'ignore', },
//       query: { fetchPolicy: 'no-cache', errorPolicy: 'all', },
//     }

//     _client = new ApolloClient({
//       link: authLink.concat(httpLink),
//       cache: new InMemoryCache(),
//       defaultOptions: defaultOptions,
//     });

//   } catch (error) {
//     debugger;

//   }

//   return _client;

// }
