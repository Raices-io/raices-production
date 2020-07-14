import React, { useEffect } from 'react';
import { useAuth } from '../../../util/auth';
import { useRouter } from 'next/router';
import PendingHomeChangeComponent from '../../../components/Home/PendingHomeChangeComponent';
import PageContainer from '../../../components/PageContainer';

const Index = () => {
	// ROUTER
	const router = useRouter();
	// AUTH
	const auth = useAuth();
	const user = auth.user;

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
			<PendingHomeChangeComponent />
		</PageContainer>
	);
};
export default Index;
