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
import { useRouter } from 'next/router';
import Link from 'next/link';
// get firestore in for client side calls for now.
// after MVP launched work on getting this logic to backend and pagination
import firebase from '../../util/firebase';

const HomeComponent = ({ home, user, preview }) => {
	const [showImageModal, setShowImageModal] = useState(false);
	const firestore = firebase.firestore();
	const router = useRouter();
	let images = [];
	home.images.forEach(obj => images.push(obj.downloadURL));
	const messageAgent = async () => {
		if (!user) {
			router.push('/signin');
		}
		const content = `Hi ${home.agent.displayName.split(' ')[0]} - I'm interested in ${
			home.addressLineOne
		}`;
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
		<div className="relative w-full flex flex-col h-full flex-shrink-0 flex-grow overflow-hidden bg-white mb-0 md:pb-0 ">
			<div className="hidden md:block">
				<TopNav />
			</div>
			<Link href={`/homes/${home.city}`}>
				<div className="ml-4 flex text-gray-600 items-center top-2 cursor-pointer">
					<svg
						className="h-5 w-5 flex justify-center items-center"
						stroke="currentColor"
						fill="text-grey-600"
						viewBox="0 0 24 24">
						<path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
					</svg>
					<span className=" text-xl text-center">Back</span>
				</div>
			</Link>
			{showImageModal && <ImageGalleryModal setShowImageModal={setShowImageModal} images={images} />}
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
				<div className="sm:flex md:hidden">
					<SmallImageHeader images={images} setShowImageModal={setShowImageModal} />
				</div>
				<div className="max-w-3xl grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 h-full lg:max-w-screen-xl lg:px-24 md:pb-20 lg:pb-4">
					<div className="">
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
			</div>
			<div className="flex w-full md:hidden">
				<BottomNav />
			</div>
		</div>
	);
};
export default HomeComponent;
