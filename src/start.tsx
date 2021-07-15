import { getSession, useSession } from 'next-auth/client';
import React from 'react'
import Layout from '../components/layout';

interface startProps {

}

const Start: React.FC<startProps> = ({ }) => {

	const [session, loading] = useSession()

	console.log("---------//---------")
	console.log(session);

	return (
		<Layout>

			Start Page ...

			{new Date().toISOString()}

		</Layout>
	);
}
export default Start

// export async function getServer SideProps(context: any) {
// 	debugger;
// 	const session = await getSession(context)
// 	return {
// 		props: {
// 			session,
// 		}
// 	}
// }