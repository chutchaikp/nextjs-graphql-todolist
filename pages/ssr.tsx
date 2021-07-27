import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react'

const Ssr = (props: any) => {

	// or use hook like this 
	// - const { user, isLoading } = useUser();

	debugger;

	return (
		<div>

		</div>
	);
}
export default Ssr

// export default function Profile({ user }) {
//   return <div>Hello {user.name}</div>;
// }

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired();