import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: any) {
	return (
		<div style={{
			padding: '0 1rem 1rem 1rem',
			maxWidth: '680px',
			margin: '0 auto',
			minHeight: '100vh',
		}}>
			<Header />
			<main>
				{children}
			</main>
			{/* <Footer /> */}
		</div>
	)
}