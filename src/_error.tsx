import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';

const Error = () => {

	return (
		<>
			Hello ....
		</>
	);
};

Error.getInitialProps = ({ res, err }: any) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

// export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
//   const statusCode = res ? res.statusCode : 404;

//   if (statusCode === 404) {
//     if (req.url.match(/\/$/)) {
//       const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
//       if (res) {
//         res.writeHead(303, {
//           Location: withoutTrailingSlash
//         });
//         res.end();
//       }
//       else {
//         Router.push(withoutTrailingSlash);
//       }
//     }
//   }

//   return {
//     props: {
//       statusCode
//     }
//   };
// };

export default Error;