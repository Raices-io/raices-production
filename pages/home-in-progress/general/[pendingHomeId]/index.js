import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../util/auth';
import { useRouter } from 'next/router';

import { firebase } from '../../../../util/firebase';

import WizardProgressHeader from '../../../../components/FormElements/WizardProgressHeader';
import GeneralInformationForm from '../../../../components/addHome/GeneralInformationForm';
import LoadingPage from '../../../../components/LoadingSpinner/LoadingPage';

const General = () => {
	const [loading, setLoading] = useState(true);
	const [pendingHome, setPendingHome] = useState(false);
	const router = useRouter();
	const { pendingHomeId } = router.query;
	const firestore = firebase.firestore();
	const auth = useAuth();
	const user = auth.user;

	const handleFormFieldChange = ev => {
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
	const handleBooleanChange = (name, value) => {
		// value will be opposite of what we want it changed to
		setPendingHome(oldHome => {
			return {
				...oldHome,
				[name]: value,
			};
		});
		// if the owner value is true, then set the agent of the home to be our agent
		if (name == 'owner' && value) {
			setPendingHome(oldHome => {
				return {
					...oldHome,
					agent: {
						profilePic:
							'https://lh5.googleusercontent.com/-m89fQhCDw8c/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucll99SezgybOcpSLAwbG68kg7nBoA/photo.jpg',
						uid: 'NX8o69qwb6NcLaTiXdNBkVpopaT2',
						displayName: 'Andrea G.',
					},
				};
			});
		} else {
			setPendingHome(oldHome => {
				return {
					...oldHome,
					agent: {
						profilePic: user.profilePic,
						uid: user.uid,
						displayName: user.displayName,
					},
				};
			});
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
				if (doc.data().userId !== user.uid && user.userType !== 'admin') {
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
	const handleCheckboxChange = (name, value, add) => {
		// if add is false we're taking the value out of the array
		let oldValue = pendingHome[name]; // this is the old array
		if (add) {
			oldValue.push(value);
		} else {
			oldValue = oldValue.filter(item => item !== value);
		}
		setPendingHome(oldHome => {
			return {
				...oldHome,
				[name]: oldValue,
			};
		});
	};
	const handleIterationChange = (name, value, add) => {
		setPendingHome(oldHome => {
			let newValue = 0;
			if (add) {
				newValue = oldHome[name] + value;
			} else {
				newValue = oldHome[name] - value;
				if (newValue < 0) {
					return {
						...oldHome,
					};
				}
			}
			return {
				...oldHome,
				[name]: newValue,
			};
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
			<WizardProgressHeader percentage={25} title={'Información general'} />
			{loading && <LoadingPage />}
			{pendingHome && (
				<div className="mt-15 flex flex-col h-full flex-grow mx-0  overflow-y-scroll flex-grow pt-2">
					<GeneralInformationForm
						home={pendingHome}
						handleFormFieldChange={handleFormFieldChange}
						handleBooleanChange={handleBooleanChange}
						handleCheckboxChange={handleCheckboxChange}
						handleIterationChange={handleIterationChange}
						updateHome={updateHome}
						homeId={pendingHome.id}
					/>
				</div>
			)}
		</div>
	);
};
export default General;
