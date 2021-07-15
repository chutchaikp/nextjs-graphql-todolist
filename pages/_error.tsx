import Error from 'next/error';


function Page({ statusCode }: any) {
	return <Error statusCode={statusCode}></Error>;
}

Page.getInitialProps = ({ res, err }: any) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Page;

// ---------------------------//--------------------------

// import React from 'react';

// export async function getServer SideProps(context: any) {
//   return {
//     props: {value:'x-error'}, // will be passed to the page component as props
//   }
// }

// function Error({ statusCode }: any) {
//   return (
//     <p>
//       {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
//     </p>
//   );
// }

// export default Error;
