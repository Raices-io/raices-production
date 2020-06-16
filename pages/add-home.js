// This is the work in progress, not currently live on the site. We're currently using a google forms,
// can be seen at get-started.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../util/auth';
import { useRouter } from 'next/router';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import firebase from '../util/firebase';
import PendingHomeForm from '../components/Forms/PendingHomeForm';
import LoadingPage from '../components/LoadingSpinner/LoadingPage';
const Add = () => {
	// ****
	// AUTH
	// ****
	const auth = useAuth();
	const user = auth.user;
	const router = useRouter();
	// ****
	// FIRESTORE
	// ****
	const firestore = firebase.firestore();
	const [loading, setLoading] = useState(false);
	const [pendingHomes, setPendingHomes] = useState(null);
	// ****
	// Get the pending homes for the user
	// ****
	const getPendingHomes = async () => {
		setLoading(p => true);
		await firestore
			.collection('pendingHomes')
			.where('userId', '==', user.uid)
			.get()
			.then(snapshot => {
				let homes = [];
				if (snapshot.empty) {
					setLoading(p => false);
					return;
				}
				snapshot.forEach(doc => {
					homes.push({ id: doc.id, ...doc.data() });
				});
				setPendingHomes(p => homes);
				setLoading(p => false);
			});
	};

	// // if not signed in redirect to sign in page
	useEffect(() => {
		if (user == false) {
			router.push('/signin');
		}
	}, [auth, router]);

	// on page load, search for any pending homes attached to the user
	useEffect(() => {
		if (user && !pendingHomes) {
			getPendingHomes();
		}
	}, [user]);
	return (
		<div className=" relative flex flex-col w-screen h-full flex-grow bg-white overflow-y-scroll antialiased">
			<div className="z-40 hidden md:block px-12 mt-12">
				<TopNav fixed />
			</div>
			<div className="sm:py-6 pb-12 flex flex-col overflow-y-scroll h-full flex-grow mx-0 flex-grow mt-8">
				{/* Container for homes in progress vs create a new one */}
				{loading && <LoadingPage />}
				{!loading && <PendingHomeForm pendingHomes={pendingHomes} />}
			</div>
			<div className="flex w-full md:hidden">
				<BottomNav />
			</div>
		</div>
	);
};
export default Add;
