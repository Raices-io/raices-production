import React, { useEffect } from 'react';
import { useAuth } from '../util/auth.js';
import { useRouter } from 'next/router';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import GoogleForm from '../components/Forms/GoogleForm';

const GetStarted = () => {
	const auth = useAuth();
	const user = auth.user;
	const router = useRouter();
	// Redirect to /signin
	// if not signed in.
	useEffect(() => {
		if (auth.user === false) {
			router.push('/signin');
		}
	}, [auth, router]);
	if (!auth.user) {
		return <div className="h-screen w-screen bg-white"></div>;
	}
	return (
		<div className="relative flex flex-col w-screen h-screen flex-grow flex-shrink-0 bg-white overflow-y-scroll antialiased">
			<div className="z-40 hidden md:block px-12 mt-12">
				<TopNav fixed />
			</div>
			<div className="flex h-full overflow-y-scroll">
				<GoogleForm />
			</div>
			<div className="flex w-full md:hidden">
				<BottomNav />
			</div>
		</div>
	);
};

export default GetStarted;
