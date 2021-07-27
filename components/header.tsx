import Link from 'next/link'
import styles from './header.module.css'
import Image from 'next/image'
import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Header() {

	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	const stl = `nojs-show ${(!user && isLoading) ? styles.loading : styles.loaded}`;

	return (
		<header>
			<div className={styles.signedInStatus}>
				<div className={stl}>
					{!user && (
						<Flex direction="row" align="center" justify="space-between" w="100%"  >
							<span className={styles.notSignedInText}>You are not signed in</span>
							<a
								href={`/api/auth/login`}
								className={styles.buttonPrimary}
							>
								Sign in
							</a>
						</Flex>
					)}
					{user && (
						<Flex direction="row" align="center" justify="space-between" w="100%"  >
							<Flex w="250px" justify="center" align="center">

								<Image src={user?.picture || ""} alt={user?.name || ""} width="45px" height="45px" />

								<Box lineHeight="1.25rem" style={{ fontSize: '1rem', paddingLeft: '0.75rem', textAlign: 'left', }} >
									<div>Signed in as</div>
									<div>{user?.email || user?.name}</div>
								</Box>
							</Flex>
							<a
								href={`/api/auth/logout`}
								className={styles.button}
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
					</ul>
				</nav>
			)}

		</header>
	)
}
