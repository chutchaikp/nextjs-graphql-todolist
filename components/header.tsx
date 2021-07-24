/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import styles from './header.module.css'
import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Header() {

	debugger;

	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	const stl = `nojs-show ${(!user && isLoading) ? styles.loading : styles.loaded}`;

	// debugger;

	return (
		<header>
			{/* <noscript>
				<style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
			</noscript> */}
			<div className={styles.signedInStatus}>
				<div className={stl}>
					{!user && (

						<Flex direction="row" align="center" justify="space-between" w="100%"  >
							<span className={styles.notSignedInText}>You are not signed in</span>
							{/* <a href="/api/auth/login">Login</a> */}
							<a
								href={`/api/auth/login`}
								className={styles.buttonPrimary}
							// onClick={(e) => {
							// 	e.preventDefault()
							// 	signIn()
							// }}
							>
								Sign in
							</a>
						</Flex>


					)}
					{user && (
						<Flex direction="row" align="center" justify="space-between" w="100%"  >
							<Flex w="250px" justify="center" align="center">
								{/* {user?.image && <span style={{ backgroundImage: `url(${user.image})` }} className={styles.avatar} />} */}
								<img src={user?.picture || ""} alt={user?.name || ""} width="45px" height="45px" />
								<Box lineHeight="1.25rem" style={{ fontSize: '1rem', paddingLeft: '0.75rem', textAlign: 'left', }} >
									<div>Signed in as</div>
									<div>{user?.email || user?.name}</div>
								</Box>
							</Flex>
							<a
								href={`/api/auth/logout`}
								className={styles.button}
							// onClick={(e) => {
							// 	e.preventDefault()
							// 	signOut()
							// }}
							>
								Sign out
							</a>
						</Flex>
					)}

				</div>

			</div>

			{user && (
				<nav>
					<ul className={styles.navItems}>
						<li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
						<li className={styles.navItem}><Link href="/profile"><a>Profile</a></Link></li>
						<li className={styles.navItem}><Link href="/todoapp"><a>Todo</a></Link></li>
						{/* <li className={styles.navItem}><Link href="/start"><a>Start</a></Link></li> */}
						{/* <li className={styles.navItem}><Link href="/todo2"><a>Todo List</a></Link></li> */}
						{/* <li className={styles.navItem}><Link href="/lottery"><a>Lottery</a></Link></li> */}
					</ul>
				</nav>
			)}

		</header>
	)
}
