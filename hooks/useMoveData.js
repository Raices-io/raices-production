import { firestore } from '../util/firebase';

const useMoveData = () => {
	const moveData = async () => {
		const homes = [];

		await firestore
			.collection('homes_Medellin')
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => homes.push({ ...doc.data() }));
			});

		await homes.forEach(async home => {
			const homeRef = await firestore.collection('homes').doc(home.id);
			const newHome = await homeRef.set(home);

			console.log(newHome);
		});
	};

	return { moveData };
};

export default useMoveData;
