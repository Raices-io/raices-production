import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../util/auth';
import { useRouter } from 'next/router';

import { firebase } from '../../../../util/firebase';

import WizardProgressHeader from '../../../../components/FormElements/WizardProgressHeader';
import DescriptionsTextForms from '../../../../components/Forms/DescriptionsTextForm';
import LoadingPage from '../../../../components/LoadingSpinner/LoadingPage';

const Descriptions = () => {
	const [loading, setLoading] = useState(true);
	const [pendingHome, setPendingHome] = useState(false);
	const router = useRouter();
	const { pendingHomeId } = router.query;
	const firestore = firebase.firestore();
	const auth = useAuth();
	const user = auth.user;

	const handleFormFieldChange = ev => {
		console.log('triggered');
		const param = ev.target.name;
		const value = ev.target.value.trimLeft();
		setPendingHome(oldHome => {
			return {
				...oldHome,
				[param]: value,
			};
		});
	};

	const updateHome = async () => {
		try {
			console.log('updating');
			await firestore
				.collection('pendingHomes')
				.doc(pendingHome.id)
				.update({
					...pendingHome,
				});
			return;
		} catch (e) {
			console.log(e);
			return;
		}
	};

	const getPendingHome = async homeId => {
		setLoading(p => true);
		await firestore
			.collection('pendingHomes')
			.doc(pendingHomeId)
			.get()
			.then(doc => {
				if (!doc.exists) {
					console.log('no such home');
					router.push('/');
					setLoading(p => false);
					return;
				}
				if (!user.admin) {
					console.log(user);
					console.log('user not authed to see this home');
					setLoading(p => false);
					return;
				}
				setPendingHome(p => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});
				setLoading(p => false);
			});
	};

	useEffect(() => {
		if (pendingHomeId && user) {
			getPendingHome(pendingHomeId);
		}
	}, [user]);
	return (
		<div className="relative flex flex-col w-screen flex-grow bg-white h-full min-h-full overflow-hidden antialiased">
			{/* Below is the form in progress. To accellerate launch to MVP we're going to use Google Forms and have our people manually upload homes to get started. */}
			<WizardProgressHeader percentage={75} title={'Descripciones'} />
			{loading && <LoadingPage />}
			{pendingHome && (
				<div className="mt-15 flex flex-col h-full flex-grow mx-0  overflow-y-scroll flex-grow pt-2">
					<form className="pt-4 bg-white flex flex-col flex-grow px-4 pb-0 flex-shrink-0 h-full">
						<div className="flex flex-col flex-grow">
							<DescriptionsTextForms
								home={pendingHome}
								handleFormFieldChange={handleFormFieldChange}
								updateHome={updateHome}
							/>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
export default Descriptions;
