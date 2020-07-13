import { useState, useEffect } from 'react';
import { firestore } from '../util/firebase';
import { useAuth } from '../util/auth';

const useGetAgentHomes = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [approvedHomes, setApprovedHomes] = useState([]);

	const { user } = useAuth();
	console.log('USER', user);

	// subscribes to homes in medellin
	useEffect(() => {
		if (user) {
			setLoading(true);

			const unsubscribe = firestore
				.collection('homes')
				.where('agent.uid', '==', user.uid)
				.onSnapshot(
					snapshot => {
						const homes = [];
						snapshot.forEach(doc => homes.push({ ...doc.data() }));

						setLoading(false);
						setApprovedHomes(homes);
					},
					err => {
						setLoading(false);
						setError(err);
					},
				);
			return () => unsubscribe();
		}
	}, [user]);

	return { error, loading, approvedHomes };
};

export default useGetAgentHomes;
