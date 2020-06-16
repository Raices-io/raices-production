import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../util/auth';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import firebase from '../../../../util/firebase';

import WizardProgressHeader from '../../../../components/FormElements/WizardProgressHeader';
import Uploader from '../../../../components/ImageUploader/Uploader';
import LoadingPage from '../../../../components/LoadingSpinner/LoadingPage';
import MobileWizardNavigation from '../../../../components/Navigation/MobileWizardNavigation';

const BackgroundImage = styled.div`
	background-image: url(${props => props.image});
	height: 400px;
	width: 600px;
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
	margin-top: 1rem;
	display: block;
	position: relative;
	@media (max-width: 599px) {
		width: 100%;
	}
`;
const Images = () => {
	const [loading, setLoading] = useState(true);
	const [pendingHome, setPendingHome] = useState(false);
	const [images, setImages] = useState([]);
	const router = useRouter();
	const { pendingHomeId } = router.query;
	const firestore = firebase.firestore();
	const storage = firebase.storage();
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
				if (doc.data().userId !== user.uid) {
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
	const getImages = async () => {
		let images = [];
		setLoading(p => true);
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

	const deletePhoto = (docId, name) => {
		// delete the storage ref
		const photoRef = storage.ref().child(`images/`).child(`homeImages/${pendingHomeId}/${name}`);
		photoRef.delete();
		// delete the doc
		firestore
			.collection('images')
			.doc(docId)
			.delete()
			.then(() => console.log('deleted!'));
		// remove it from state
		let updatedImages = images.filter(img => img.docId !== docId);
		setImages(p => updatedImages);
	};
	useEffect(() => {
		if (pendingHomeId && user) {
			getPendingHome();
			getImages();
		}
	}, [user]);
	return (
		<div className="relative flex flex-col w-screen flex-grow bg-white  min-h-full  overflow-y-scroll h-full antialiased">
			{/* Below is the form in progress. To accellerate launch to MVP we're going to use Google Forms and have our people manually upload homes to get started. */}
			<WizardProgressHeader percentage={50} title={'Imágenes'} />
			{loading && <LoadingPage />}

			{pendingHome && (
				<div class="mt-15 relative flex flex-col w-screen h-full flex-grow bg-white overflow-y-scroll antialiased ">
					<div className=" flex flex-col overflow-y-scroll h-full flex-grow mx-0 flex-grow mt-8">
						<h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
							Sube imágenes
						</h2>
						<Uploader pendingHomeId={pendingHomeId} images={images} setImages={setImages} />
						{images.length > 1 && (
							<h2 class="mt-6 text-center text-xl leading-9 font-semibold text-gray-900">
								Ya subido
							</h2>
						)}
						{/* Any images already associated with the pending home */}
						{images &&
							images.map(img => {
								return (
									<div class="w-full h-auto block flex justify-center flex-grow bg-cover bg-no-repeat bg-center">
										<BackgroundImage image={img.downloadURL}>
											<div
												onClick={() => deletePhoto(img.docId, img.name)}
												className="bg-black absolute left-5 top-20 sm:left-5 sm:top-5 opacity-50 rounded-full h-10 w-10 border border-white flex justify-center items-center">
												<svg
													className="fill-current text-white h-6 w-6"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20">
													<path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
												</svg>
											</div>
										</BackgroundImage>
									</div>
								);
							})}
					</div>
				</div>
			)}
			<MobileWizardNavigation errors={false} percentage={50} homeId={pendingHomeId} />
		</div>
	);
};
export default Images;
