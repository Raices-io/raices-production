import React, { Fragment } from 'react';
import Head from 'next/head';

const LoadingPage = () => {
	return (
		<Fragment>
			<Head>
				<link
					rel="stylesheet"
					href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
					integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
					crossOrigin="anonymous"></link>
			</Head>
			<div className="w-screen h-screen flex justify-center items-center fixed block top-0 left-0 bg-white opacity-75 z-50">
				<div className="w-32 h-32">
					{' '}
					<span className="flex flex-col flex-grow justify-center items-center text-indigo-700 opacity-75">
						<i className="fas fa-circle-notch fa-spin fa-5x"></i>
					</span>
				</div>
			</div>
		</Fragment>
	);
};
export default LoadingPage;
