import React from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const Done = ({ }) => {

	debugger;
	const { user, isLoading } = useUser();

	debugger;

	return (
		<div>
			done
		</div>
	);
}
export default Done