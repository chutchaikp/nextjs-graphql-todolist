import axios from "axios";
// import { findDeprecatedUsages } from "graphql";
// import { GetTodosWithFetchMoreDocument } from "../src/types/generated";

import cookie from "cookie";

export async function GraphQLLogin(req: any, res: any) {
	try {
		const url = `${process.env.GRAPHQL_SCHEMA_BASE_URL}/auth/local`;
		const { data } = await axios.post(url, {
			identifier: process.env.GRAPHQL_USER,
			password: process.env.GRAPHQL_PASSWORD,
		});

		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", data.jwt, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				maxAge: 60 * 60,
				sameSite: "strict",
				path: "/",
			})
		);
		return data.jwt

	} catch (error) {
		return "";

	}
}

async function fetchAPI(token: any, query: any, { variables }: any = {}) {
	try {

		const res = await fetch(`${process.env.GRAPHQL_SCHEMA_BASE_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token}`,
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		})

		// axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
		//     .then(res => {
		// const { data } = await axios({
		// 	method: 'post',
		// 	url: `${process.env.GRAPHQL_SCHEMA_BASE_URL}/graphql`,
		// 	headers: { "Authorization": `Bearer ${token}` },
		// 	data: JSON.stringify({ query, variables, }),
		// });

		const json = await res.json()
		if (json.errors) {
			console.error(json.errors)
			throw new Error('Failed to fetch API')
		}
		return json.data

	} catch (error) {
		console.log(error)
		return []
	}
}

/*
query GetTodosWithFetchMore($limit: Int, $start: Int) {  
	todos(limit: $limit, start: $start, sort: "createdAt:desc") {
		id
		title
		finished
		updatedAt
	}
	todosConnection {
		aggregate {
			count
		}
	}
}
*/

/* 
 export const GetTodosWithFetchMoreDocument = gql`
		query GetTodosWithFetchMore($limit: Int, $start: Int) {
	todos(limit: $limit, start: $start, sort: "createdAt:desc") {
		id
		title
		finished
		updatedAt
	}
	todosConnection {
		aggregate {
			count
		}
	}
}
		`;
 */

export async function GetTodosForHome(token: any) {
	const data = await fetchAPI(token,
		// 	`
		//   query Posts($where: JSON){
		//     posts(sort: "date:desc", limit: 10, where: $where) {
		//       title
		//       slug
		//       excerpt
		//       date        
		//     }
		//   }
		// `

		// GetTodosWithFetchMoreDocument
		`			query GetTodosWithFetchMore($limit: Int, $start: Int) {
						todos(limit: $limit, start: $start, sort: "createdAt:desc") {
							id
							title
							finished
							create_by
							updatedAt
						}
						todosConnection {
							aggregate {
								count
							}
						}
					}
		`
		,
		{
			// variables: {
			// 	where: {
			// 	  ...(preview ? {} : { status: 'published' }),
			// 	},
			// },
			variables: {
				limit: 2,
				start: 0,
			},
		}
	)

	return data
}
