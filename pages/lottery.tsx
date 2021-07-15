import { Button } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/client';
import React, { useState } from 'react'
import Layout from '../components/layout';
import { GraphQLLogin } from '../lib/api';

interface lotteryProps {

}

const Lottery: React.FC<lotteryProps> = ({ }) => {
	const [session, loading] = useSession();
	const [num, setNum] = useState("00")

	const pad = (num: number, size: number) => {
		var s = "000000000" + num;
		return s.substr(s.length - size);
	}

	const getRandomInt = (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		const result = Math.floor(Math.random() * (max - min + 1)) + min;
		setNum(pad(result, 2))
	}

	// const rdNumber = getRandomInt(1, 50)	
	// console.log(rdNumber);

	return (
		<Layout>
			{session && (
				<div>
					<Button borderRadius="50px" bg="turquoise" color="white" size="50rem" p="2rem" onClick={() => { getRandomInt(1, 50) }} > {num} </Button>
				</div>
			)}
		</Layout>
	);
}
export default Lottery

export const getServerSideProps = async (context: any) => {

	const session = await getSession(context)
	const jwt = await GraphQLLogin(session?.user?.email || '');
	// const response = (await GetTodosForHome()) || []
	// debugger;
	return {
		props: {
			session,
			graphQlConnection: { jwt, url: process.env.GRAPHQL_SCHEMA_BASE_URL, },
			// data: response,
		}
	}

}
