
import React from 'react'
import Error from 'next/error'
import Layout from '../components/layout';

const Env = (props: any) => {

	// debugger;
	return (
		<Layout>
			<p>
				process.env.NODE_ENV
			</p>
			<p>
				{process.env.NODE_ENV}
			</p>
		</Layout>
	)

	return (
		<div>
			<span>process.env.AUTH0_SECRET</span>
			<p>
				{process.env.AUTH0_SECRET}
			</p>
			<hr />

			<span>process.env.AUTH0_CLIENT_SECRET</span>
			<p>
				{process.env.AUTH0_CLIENT_SECRET}
			</p>
		</div>
	);
}

Env.getInitialProps = async (context: any) => {
	// debugger;
	const secret = process.env.AUTH0_CLIENT_SECRET;

	return {
		props: {
			data: {
				secret,
			}
		}
	}
}


export default Env