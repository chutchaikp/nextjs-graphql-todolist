

// <nav>
// 	<ul className={styles.navItems}>
// 		<li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
// 		<li className={styles.navItem}><Link href="/start"><a>Start</a></Link></li>
// 		<li className={styles.navItem}><Link href="/todo2"><a>Todo List</a></Link></li>
// 	</ul>
// </nav>

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'
import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {

	const [session, loading] = useSession()

	const stl = `nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`;

	// debugger;

	return (
		<header>
			{/* <noscript>
				<style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
			</noscript> */}
			<div className={styles.signedInStatus}>
				<div className={stl}>
					{!session && (

						<Flex direction="row" align="center" justify="space-between" w="100%"  >
							<span className={styles.notSignedInText}>You are not signed in</span>
							<a
								href={`/api/auth/signin`}
								className={styles.buttonPrimary}
								onClick={(e) => {
									e.preventDefault()
									signIn()
								}}
							>
								Sign in
							</a>
						</Flex>


					)}
					{session && (
						<Flex direction="row" align="center" justify="space-between" w="100%"  >
							<Flex style={{ width: '250px', }}>
								{session?.user?.image && <span style={{ backgroundImage: `url(${session.user.image})` }} className={styles.avatar} />}
								{/* <span className={styles.signedInText}> */}
								<Box style={{ fontSize: '1rem', paddingLeft: '0.75rem', textAlign: 'left', }} >
									<div>Signed in as</div>
									<div>{session?.user?.email || session?.user?.name}</div>
								</Box>
								{/* </span> */}
							</Flex>
							<a
								href={`/api/auth/signout`}
								className={styles.button}
								onClick={(e) => {
									e.preventDefault()
									signOut()
								}}
							>
								Sign out
							</a>
						</Flex>
					)}

				</div>

			</div>

			{session && (
				<nav>
					<ul className={styles.navItems}>
						<li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
						<li className={styles.navItem}><Link href="/start"><a>Start</a></Link></li>
						{/* <li className={styles.navItem}><Link href="/todo2"><a>Todo List</a></Link></li> */}
						<li className={styles.navItem}><Link href="/lottery"><a>Lottery</a></Link></li>
					</ul>
				</nav>
			)}

		</header>
	)
}
