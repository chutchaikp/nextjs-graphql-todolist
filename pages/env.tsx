import React from 'react'

interface envProps {

}

const env: React.FC<envProps> = ({ }) => {
	return (
		<div>
			<span>process.env.AUTH0_SECRET</span>
			<p>
				{process.env.AUTH0_SECRET}
			</p>
			<hr />

			<span>process.env.AUTH0_CLIENT_SECRET</span>
			<p>
				{process.env.AUTH0_CLIENT_SECRET}
			</p>
		</div>
	);
}
export default env