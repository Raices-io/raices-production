import { useState, useEffect } from 'react';
import { firestore } from '../util/firebase';

const useGetHomes = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [homes, setHomes] = useState([]);

	// subscribes to homes in medellin
	useEffect(() => {
		setLoading(true);

		const unsubscribe = firestore.collection('homes').onSnapshot(
			snapshot => {
				const homes = [];
				snapshot.forEach(doc => homes.push({ ...doc.data(), pending: false }));

				setLoading(false);
				setHomes(homes);
			},
			err => {
				setLoading(false);
				setError(err);
			},
		);

		return () => unsubscribe();
	}, []);

	return { error, loading, homes };
};

export default useGetHomes;
