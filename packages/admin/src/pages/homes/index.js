import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../util/auth';
import { useRouter } from 'next/router';
import { firebase } from '../../util/firebase';
import PendingHomeListComponent from '../../components/PendingHomeListComponent';
import Stats from '../../components/Stats';
import PageContainer from '../../components/PageContainer';
import usePendingHomes from '../../hooks/usePendingHomes';
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
		<PageContainer>
			{/* stats */}
			<Stats pendingHomes={pendingHomes} />
			{/* List of pending homes */}
			<div className="bg-white shadow sm:rounded-md mx-6">
				<ul>
					{/* List Component for the pending homes */}
					{loading && <span>Loading...</span>}
					{pendingHomes && pendingHomes.map(home => <PendingHomeListComponent home={home} />)}
				</ul>
			</div>
		</PageContainer>
	);
};

export default Index;
