import React, { Fragment } from 'react';
import Filled from '../Buttons/Filled';
import MinimalIcon from '../Buttons/MinimalIcon';
import { useRouter } from 'next/router';
import firebase from '../../util/firebase';

const MobileWizardNavigation = ({
	setPercentage,
	percentage,
	updateHome,
	errors,
	runValidation = () => console.log('validate'),
	homeId,
}) => {
	const router = useRouter();
	const firestore = firebase.firestore();

	const previous = () => {
		router.back();
	};
	const next = async () => {
		if (errors) {
			return;
		}
		// if it's complete, show the warning modal letting know we're going to review it
		if (percentage == 100) {
			// set the pending home to status "pending"
			try {
				await firestore.collection('pendingHomes').doc(homeId).update({
					status: 'pending',
				});
			} catch (e) {
				console.log(e);
				return;
			}
			router.push('/');
		}
		// if it's the first page (percentage 25), create a pending home document
		// IF no pending doc exists already.
		if (percentage === 25) {
			await updateHome();
			router.push(`/home-in-progress/images/${homeId}`);
		}
		if (percentage == 50) {
			router.push(`/home-in-progress/descriptions/${homeId}`);
		}
		if (percentage === 75) {
			await updateHome();
			try {
				await firestore.collection('pendingHomes').doc(homeId).update({
					status: 'pending',
					createdAt: firebase.firestore.Timestamp.now(),
				});
				console.log(homeId);
			} catch (e) {
				console.log(e);
				return;
			}
			router.push(`/add-home`);
		}
	};
	return (
		<Fragment>
			<div className="flex flex-shrink-0 flex-grow bottom-0 bottomNav z-20 h-15 w-full bg-white ">
				<div className="mx-4 flex flex-grow justify-between items-center h-full">
					<MinimalIcon text="Atras" onClick={previous} disabled={percentage == 25 ? true : false} />
					<Filled
						disabled={errors}
						text={percentage == 75 ? 'Terminar' : 'Siguiente'}
						onClick={() => {
							runValidation();
							next();
						}}
					/>
				</div>
			</div>
			<style jsx>{`
				.bottomNav {
					box-shadow: 0 -5px 5px -4px #f5f5f5;
				}
			`}</style>
		</Fragment>
	);
};
export default MobileWizardNavigation;
