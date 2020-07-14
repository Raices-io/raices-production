import { useEffect, useState } from 'react';
import { firestore } from '../util/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '../util/auth';

const usePendingHome = () => {
	const [pendingHome, setPendingHome] = useState(false);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);

	// ROUTER
	const router = useRouter();
	const { pendingHomeId } = router.query;
	// AUTH
	const auth = useAuth();
	const user = auth.user;

	const getPendingHome = async () => {
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
				setPendingHome(p => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});
				setLoading(p => false);
			})
			.catch(error => console.error(error.message));
	};

	const getImages = async () => {
		setLoading(p => true);

		let images = [];
		let imagesRef = await firestore.collection('images').where('homeId', '==', pendingHomeId).get();

		if (!imagesRef.empty) {
			imagesRef.forEach(image => {
				images.push({ docId: image.id, ...image.data() });
			});
			setImages(p => [...p, ...images]);
		} else {
			console.log('no images');
		}
	};

	useEffect(() => {
		if (pendingHomeId) {
			getPendingHome();
			getImages();
		}
	}, [user]);

	return { pendingHome, images, loading };
};

export default usePendingHome;
