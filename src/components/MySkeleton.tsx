import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react'

const MySkeleton = () => {
	return (
		<Flex w="100%" justify="center" align="center" minH="100vh">
			<Stack w="50%">
				<Skeleton height="100px" />
				<Skeleton height="100px" />
				<Skeleton height="100px" />
			</Stack>
		</Flex>
	);
}
export default MySkeleton