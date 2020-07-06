import React, { useState, Fragment } from 'react';
import LargeImageHeader from '../Gallery/LargeImageHeader';
import SmallImageHeader from '../Gallery/SmallImageHeader';
import MediumImageHeader from '../Gallery/MediumImageHeader';
import BottomNav from '../Navigation/BottomNav';
import ShowingButton from '../Buttons/ShowingButton';
import HomeDetails from '../Home/HomeDetails';
import BottomFloatingSeeButton from '../Buttons/BottomFloatingSeeButton';
import TopNav from '../Navigation/TopNav';
import ImageGalleryModal from '../Gallery/ImageGalleryModal';
import LargeShowingCard from '../../components/Cards/LargeShowingCard';
import Router, { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
// get firestore in for client side calls for now.
// after MVP launched work on getting this logic to backend and pagination
import { firebase } from '../../util/firebase';
import TourModal from '../Tour/TourModal';

const HomeComponent = ({ home, user, preview }) => {
	const [showImageModal, setShowImageModal] = useState(false);
	const [showTourModal, setShowTourModal] = useState(false);
	const firestore = firebase.firestore();
	const router = useRouter();
	let images = [];
	home.images.forEach(obj => images.push(obj.downloadURL));
	const messageAgent = async () => {
		if (!user) {
			router.push('/signin');
		}
		const content = `Hi ${home.agent.displayName.split(' ')[0]} - I'm interested in ${home.title}`;
		const agent = home.agent;
		let data = {
			lastContent: content,
			lastDate: firebase.firestore.Timestamp.now(),
			userIds: [user.uid, agent.uid],
			users: [
				{
					id: user.uid,
					name: user.displayName,
					profilePic: user.profilePic,
				},
				{
					id: agent.uid,
					name: agent.displayName,
					profilePic: agent.profilePic,
				},
			],
		};
		// create a new conversation
		const chatsRef = await firestore.collection('chats').add(data);
		const chatId = chatsRef.id;
		const messagesRef = firestore.collection('messages');
		await messagesRef.add({
			chatId,
			content: content,
			createdAt: firebase.firestore.Timestamp.now(),
			user: {
				id: user.uid,
				name: user.displayName,
				profilePic: user.profilePic,
			},
			userId: user.uid,
		});
		// redirect to the /inbox page
		router.push(`/messaging/chat/${chatId}`);
	};
	return (
		<>
			<NextSeo
				title={home.title}
				description={home.description}
				canonical="https://www.raices.io/"
				openGraph={{
					title: home.title,
					description: home.description,
					images: [
						{
							url: home.defaultPic,
							width: 800,
							height: 600,
							alt: home.title,
						},
					],
				}}
			/>
			<div className="relative w-full flex flex-col h-full flex-shrink-0 flex-grow overflow-hidden bg-white mb-0 md:pb-0 ">
				<div className="hidden md:block">
					<TopNav />
				</div>
				<div
					onClick={() => Router.back()}
					className="ml-4 flex text-gray-600 items-center top-2 cursor-pointer">
					<svg
						className="h-5 w-5 flex justify-center items-center"
						stroke="currentColor"
						fill="text-grey-600"
						viewBox="0 0 24 24">
						<path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
					</svg>
					<span className=" text-xl text-center">Atras</span>
				</div>
				{showImageModal && (
					<ImageGalleryModal setShowImageModal={setShowImageModal} images={images} />
				)}
				{showTourModal && <TourModal setShowTourModal={setShowTourModal} tourSrc={home.tour_src} />}
				<div className="font-sans antialiased mt-0 mb-2 sm:mb-0 bg-white overflow-scroll flex flex-grow flex-col">
					{/* Large Gallery Image Grid for images 1-5 */}
					<div className="hidden lg:block">
						<LargeImageHeader images={images} setShowImageModal={setShowImageModal} />
					</div>
					{/* Medium Image Header*/}
					<div className="hidden sm:block lg:hidden">
						<MediumImageHeader images={images} setShowImageModal={setShowImageModal} />
					</div>
					{/* Small Image Header*/}
					<div className="block sm:hidden">
						<SmallImageHeader images={images} setShowImageModal={setShowImageModal} />
					</div>
					<div className="max-w-3xl grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 h-full lg:max-w-screen-xl lg:px-24 md:pb-20 lg:pb-4">
						<div className="relative">
							<h2 className="px-6 md:px-0 text-gray-700 font-bold text-3xl mt-4 leading-tight">
								{home.title}
							</h2>

							<h4 className="px-6 md:px-0 text-gray-500 font-semibold">
								{home.bedrooms} bedroom · {home.bathrooms} Bath
							</h4>
							<div className="flex w-full md:hidden">
								<ShowingButton agent={home.agent} />
							</div>
							{/* Home stats will be after MVP */}
							{/* <HomeStats /> */}
							{/* House Details */}
							<HomeDetails home={home} />
							{/* Showing/Agent Button */}
							{home.tour_src && (
								<svg
									width="60"
									height="45"
									viewBox="0 0 60 45"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="absolute top-6 right-4 cursor-pointer"
									onClick={() => setShowTourModal(true)}>
									<path
										d="M37.7677 39.3331C36.8957 39.3331 36.139 38.685 36.0259 37.7973C35.9037 36.8342 36.5848 35.9544 37.5475 35.8317C43.102 35.124 48.0761 33.6189 51.5533 31.5928C54.7334 29.7402 56.4843 27.5622 56.4843 25.4601C56.4843 23.1434 54.4354 21.2478 52.716 20.0649C51.9163 19.5147 51.7139 18.4206 52.2642 17.6205C52.8144 16.8208 53.9089 16.6184 54.7086 17.1687C58.1703 19.5499 59.9999 22.4169 59.9999 25.4606C59.9999 28.9149 57.6914 32.0858 53.3234 34.6305C49.3917 36.9212 44.0903 38.5426 37.992 39.3194C37.9165 39.3286 37.8414 39.3331 37.7677 39.3331Z"
										fill="#6D6AEB"
									/>
									<path
										d="M27.7204 39.7752C27.6993 39.7752 27.6778 39.7747 27.6567 39.7738C20.3655 39.5142 13.5718 38.0347 8.52769 35.609C3.02857 32.9645 0 29.3601 0 25.46C0 23.0828 1.13205 19.5781 6.52543 16.3811C7.36039 15.8863 8.43888 16.1618 8.93418 16.9973C9.42903 17.8322 9.15345 18.9107 8.31803 19.4056C5.22126 21.2412 3.51563 23.3913 3.51563 25.46C3.51563 27.8994 5.89783 30.4436 10.0511 32.4409C14.6677 34.661 20.9647 36.0174 27.7817 36.2604C28.7522 36.2952 29.5107 37.1096 29.4759 38.0801C29.442 39.0285 28.6625 39.7752 27.7204 39.7752V39.7752Z"
										fill="#918FF0"
									/>
									<path
										d="M38.0923 21.7173V15.8167C38.0923 11.987 40.4745 10.562 43.5475 10.562C46.62 10.562 49.0246 11.987 49.0246 15.8167V21.7173C49.0246 25.5469 46.62 26.9719 43.5475 26.9719C40.4745 26.9719 38.0923 25.5469 38.0923 21.7173V21.7173ZM45.5511 15.8167C45.5511 14.2804 44.7944 13.5901 43.5475 13.5901C42.3005 13.5901 41.5658 14.2804 41.5658 15.8167V21.7173C41.5658 23.2535 42.3005 23.9438 43.5475 23.9438C44.7944 23.9438 45.5511 23.2535 45.5511 21.7173V15.8167Z"
										fill="#BCBCF6"
									/>
									<path
										d="M23.6411 44.5036C23.1916 44.5036 22.7416 44.3319 22.3983 43.9891C21.7116 43.3024 21.7116 42.1896 22.3983 41.5029L25.843 38.0583L22.3983 34.614C21.7116 33.9274 21.7116 32.8146 22.3983 32.1279C23.0845 31.4417 24.1978 31.4417 24.8844 32.1279L29.5719 36.8154C30.2581 37.5016 30.2581 38.6149 29.5719 39.3015L24.8844 43.9891C24.5411 44.3319 24.0911 44.5036 23.6411 44.5036V44.5036Z"
										fill="#6D6AEB"
									/>
									<path
										d="M18.41 21.9407V21.5177C18.41 20.0259 17.4967 19.7366 16.2722 19.7366C15.5151 19.7366 15.2701 19.0687 15.2701 18.4008C15.2701 17.7325 15.5151 17.0646 16.2722 17.0646C17.1181 17.0646 18.009 16.9534 18.009 15.1498C18.009 13.8584 17.2742 13.5467 16.361 13.5467C15.2701 13.5467 14.7135 13.814 14.7135 14.6824C14.7135 15.4391 14.3793 15.9513 13.088 15.9513C11.4849 15.9513 11.2849 15.6172 11.2849 14.5483C11.2849 12.812 12.5313 10.563 16.361 10.563C19.1891 10.563 21.3264 11.587 21.3264 14.5931C21.3264 16.2182 20.7253 17.7325 19.612 18.2447C20.9258 18.7345 21.883 19.7142 21.883 21.5177V21.9407C21.883 25.5923 19.3671 26.9729 16.2498 26.9729C12.4201 26.9729 10.9507 24.6351 10.9507 22.7647C10.9507 21.7626 11.3737 21.4953 12.5982 21.4953C14.0232 21.4953 14.3793 21.8071 14.3793 22.6535C14.3793 23.6999 15.3594 23.9448 16.361 23.9448C17.8753 23.9448 18.41 23.3882 18.41 21.9407Z"
										fill="#BCBCF6"
									/>
									<path
										d="M53.2441 10.5469C50.336 10.5469 47.9707 8.18116 47.9707 5.27344C47.9707 2.36573 50.336 0 53.2441 0C56.1519 0 58.5176 2.36573 58.5176 5.27344C58.5176 8.18116 56.1519 10.5469 53.2441 10.5469ZM53.2441 3.51563C52.2746 3.51563 51.4863 4.30436 51.4863 5.27344C51.4863 6.24299 52.2746 7.03126 53.2441 7.03126C54.2132 7.03126 55.002 6.24299 55.002 5.27344C55.002 4.30436 54.2132 3.51563 53.2441 3.51563Z"
										fill="#BCBCF6"
									/>
									<path
										d="M35.3986 21.5177V21.7182C35.3986 25.5479 33.0159 26.9729 29.9434 26.9729C26.8709 26.9729 24.4658 25.5479 24.4658 21.7182V15.8177C24.4658 11.988 26.9373 10.563 30.1439 10.563C33.9068 10.563 35.3986 12.9008 35.3986 14.7488C35.3986 15.8177 34.8864 16.1514 33.7731 16.1514C32.8159 16.1514 31.9695 15.9065 31.9695 14.8825C31.9695 14.0365 31.0791 13.5911 30.0327 13.5911C28.7189 13.5911 27.9393 14.2814 27.9393 15.8177V17.8213C28.6521 17.0422 29.6541 16.8417 30.723 16.8417C33.2608 16.8417 35.3986 17.955 35.3986 21.5177ZM27.9393 21.9632C27.9393 23.4994 28.6965 24.1673 29.9434 24.1673C31.1904 24.1673 31.9251 23.4994 31.9251 21.9632V21.7627C31.9251 20.1371 31.1904 19.5137 29.921 19.5137C28.7189 19.5137 27.9393 20.0927 27.9393 21.5621V21.9632Z"
										fill="#BCBCF6"
									/>
								</svg>
							)}
						</div>
						<div className="hidden lg:flex justify-center">
							<LargeShowingCard agent={home.agent} messageAgent={messageAgent} />
						</div>
						<div className="flex w-full md:hidden">
							<ShowingButton agent={home.agent} messageAgent={messageAgent} />
						</div>
					</div>
					<div className="hidden md:flex lg:hidden w-full content-center">
						<BottomFloatingSeeButton agent={home.agent} messageAgent={messageAgent} />
					</div>
					{/* <iframe
					id="/tours/PEAwDvfkv"
					allow="vr;accelerometer;gyroscope;fullscreen"
					allowfullscreen
					frameborder="0"
					src="https://tours.raices.io/tours/PEAwDvfkv"
					style={{
						position: 'absolute',
						height: '90%',
						width: '80%',
						padding: '2%',
						margin: '0 auto',
					}}></iframe> */}
				</div>
				<div className="flex w-full md:hidden">
					<BottomNav />
				</div>
			</div>
		</>
	);
};
export default HomeComponent;
