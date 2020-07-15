import React, { Fragment, useEffect } from 'react';
import { useAuth } from '../util/auth';
import { useRouter } from 'next/router';
import SideNav from '../components/SideNav';
import usePendingHomes from '../hooks/usePendingHomes';
import Layout from '../components/Layout';
const Index = () => {
	// ROUTER
	const router = useRouter();
	// AUTH
	const auth = useAuth();
	const user = auth.user;

	const { pendingHomes, loading } = usePendingHomes();

	//  if not signed in AND Auth user redirect to sign in page
	useEffect(() => {
		if (user == false) {
			router.push('/signin');
		}
	}, [auth, router]);

	if (!auth.user) {
		return <div className="h-screen w-screen bg-white">Loading...</div>;
	}

	if (auth.user && !auth.user.admin) {
		router.push('/signin');
	}

	return (
		<Fragment>
			<SideNav />
			<Layout>Dashboard</Layout>
		</Fragment>
	);
};

export default Index;
