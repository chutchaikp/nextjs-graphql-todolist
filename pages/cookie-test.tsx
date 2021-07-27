import { GetTodosForHome, GraphQLLogin } from '../lib/api'
import cookie from "js-cookie";

const CookieTest = (props: any) => {
	return (
		<main>
			<h1>Cookies</h1>
			<h2>Token: {props.graphQlConnection.token}</h2>
			<button
				type="button"
				onClick={() => {
					debugger;
					cookie.set("token", "ABCD", { expires: 1 / 24 });
					// fetch("/api/login", {
					// 	method: "post",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({ token: "ABCD" }),
					// });
				}}
			>
				Login
			</button>{" "}
			<button
				type="button"
				onClick={() => {
					debugger;
					cookie.remove("token");
					// fetch("/api/logout", {
					// 	method: "post",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({}),
					// });
				}}
			>
				Logout
			</button>
		</main>
	);
}

export const getServerSideProps = async ({ req, res }: any) => {
	let token = req.cookies.token;
	const graphql_base_url = process.env.GRAPHQL_SCHEMA_BASE_URL
	if (!token) {
		token = await GraphQLLogin(req, res);
	}
	const response = (await GetTodosForHome(token)) || []
	return {
		props: {
			graphQlConnection: {
				token,
				graphql_base_url,
			},
			data: response,
		}
	}
}

export default CookieTest