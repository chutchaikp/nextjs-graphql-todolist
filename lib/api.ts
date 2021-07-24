import axios from "axios";
// import { findDeprecatedUsages } from "graphql";
// import { GetTodosWithFetchMoreDocument } from "../src/types/generated";

let _jwt = "";
let _identifier = "";

export async function GraphQLLogin() {
	try {
		if (_jwt) {
			return _jwt;
		}

		debugger;

		const url = `${process.env.GRAPHQL_SCHEMA_BASE_URL}/auth/local`;
		const { data } = await axios.post(url, {
			identifier: process.env.GRAPHQL_USER,
			password: process.env.GRAPHQL_PASSWORD,
		});

		// get token from graphql server		
		// localStorage.setItem('token', data.jwt)
		_jwt = data.jwt
		return _jwt;

	} catch (error) {
		return "";

	}
}

async function fetchAPI(query: any, { variables }: any = {}) {
	try {

		const res = await fetch(`${process.env.GRAPHQL_SCHEMA_BASE_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		})
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

export async function GetTodosForHome() {

	debugger;

	const data = await fetchAPI(
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
