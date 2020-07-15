import { useState, useEffect } from 'react';
import { firestore } from '../util/firebase';

const usePendingHomes = () => {
	const [loading, setLoading] = useState(false);
	const [pendingHomes, setPendingHomes] = useState([]);
	const [empty, setEmpty] = useState(false);

	const getPendingHomes = async () => {
		setLoading(p => true);
		try {
			let data = await firestore.collection('pendingHomes').onSnapshot(querySnapshot => {
				let pendingHomes = [];
				if (querySnapshot.empty) {
					console.log('no more pending homes');
					setEmpty(true);
					setLoading(false);
					return;
				}
				querySnapshot.docChanges().forEach(change => {
					console.log(change);
					if (change.type === 'added') {
						pendingHomes.push({ id: change.doc.id, ...change.doc.data() });
						console.log(pendingHomes);
					}
				});
				setPendingHomes(p => {
					if (p.length === 0) {
						return pendingHomes;
					} else {
						return [...pendingHomes, ...p];
					}
				});
			});

			setLoading(false);
			// handles the cleanup
			return () => data();
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getPendingHomes();
	}, []);

	return { loading, pendingHomes, empty };
};

export default usePendingHomes;
