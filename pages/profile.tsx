/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../components/layout';

export default function Profile() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		user && (
			<Layout>
				<img src={user?.picture || ""} alt={user?.name || ""} />

				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</Layout>
		)
	);
}