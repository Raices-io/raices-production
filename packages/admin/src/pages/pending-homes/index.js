import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useAuth } from '../../util/auth';
import { useRouter } from 'next/router';
import { firebase } from '../../util/firebase';
import PendingHomeListComponent from '../../components/PendingHomeListComponent';
import Stats from '../../components/Stats';
import SideNav from '../../components/SideNav';
import PageContainer from '../../components/PageContainer';
import usePendingHomes from '../../hooks/usePendingHomes';
import Layout from '../../components/Layout';
const Index = () => {
	// ROUTER
	const router = useRouter();
	// AUTH
	const auth = useAuth();
	const user = auth.user;

	const { pendingHomes, loading } = usePendingHomes();

	const deniedHomes = pendingHomes.filter(home => home.status == 'denied');
	const draftHomes = pendingHomes.filter(home => home.status == 'draft');
	const reviewHomes = pendingHomes.filter(home => home.status == 'pending');
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
			<Layout>
				<PageContainer>
					{/* stats */}
					<Stats draftHomes={draftHomes} deniedHomes={deniedHomes} reviewHomes={reviewHomes} />
					{/* List of pending homes */}
					<div className="bg-white shadow sm:rounded-md mx-6">
						Homes to review
						<ul>
							{/* List Component for the pending homes */}
							{loading && <span>Loading...</span>}
							{reviewHomes && reviewHomes.map(home => <PendingHomeListComponent home={home} />)}
						</ul>
						Denied Homes
						<ul>
							{deniedHomes && deniedHomes.map(home => <PendingHomeListComponent home={home} />)}
						</ul>
						Draft Homes
						<ul>
							{draftHomes && draftHomes.map(home => <PendingHomeListComponent home={home} />)}
						</ul>
					</div>
				</PageContainer>
			</Layout>
		</Fragment>
	);
};

export default Index;
