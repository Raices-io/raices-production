import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/ConversationList/SearchBar';
import ConversationSnippet from '../components/ConversationList/ConversationSnippet';
import FiltersBar from '../components/ConversationList/FiltersBar';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import Chat from '../components/Chat';
import ChatInput from '../components/Chat/ChatInput';
import { useAuth } from './auth.js';
import { useRouter } from 'next/router';
import Spinner from '../components/LoadingSpinner/Spinner';
import LoadingPage from '../components/LoadingSpinner/LoadingPage';
// get in firebase
import firebase from './firebase';

const Inbox = () => {
	const auth = useAuth();
	const user = auth.user;
	const router = useRouter();
	const firestore = firebase.firestore();
	const messagesEndRef = useRef(null);
	const [conversations, setConversations] = useState(null);
	const [messages, setMessages] = useState([]);
	const [currentConversation, setCurrentConversation] = useState(null);
	const [messageValue, setMessageValue] = useState('');
	const [loadingConversations, setLoadingConversations] = useState(true);
	const [loadingMessages, setLoadingMessages] = useState(false);

	const handleChangeValue = event => {
		setMessageValue(event.target.value);
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	// create a message and add to a conversatino
	const createMessage = async e => {
		setMessageValue('');
		// create a message document and add it to the collection
		const conversationRef = firestore.collection('conversations').doc(currentConversation.id);
		const messagesRef = conversationRef.collection('messages');
		messagesRef.add({
			content: messageValue,
			timestamp: firebase.firestore.Timestamp.now(),
			uid: user.uid,
			from: {
				name: user.displayName,
				picture: user.profilePic,
			},
			fromLead: user.userType === 'lead' ? true : false,
		});
		// update the collection's last message
		let lastMessage = {
			content: messageValue,
			fromLead: user.userType === 'lead' ? true : false,
			timestamp: firebase.firestore.Timestamp.now(),
		};
		conversationRef.update({
			lastMessage,
		});
	};
	// get chat
	const getConversations = async () => {
		let conversations = [];
		try {
			if (user) {
				await firestore
					.collection('conversations')
					.where(`${user.userType == 'agent' ? 'userId' : 'leadId'}`, '==', user.uid)
					.get()
					.then(documentSet => {
						if (documentSet !== null) {
							documentSet.forEach(doc => {
								conversations.push({
									id: doc.id,
									...doc.data(),
								});
							});
							setConversations(p => conversations);
							setLoadingConversations(false);
						}
						return conversations;
					});
			}
		} catch (e) {
			setLoadingConversations(false);
			console.log(e);
		}
	};

	const getMessages = async () => {
		let messages = [];
		try {
			if (currentConversation) {
				await firestore
					.collection('conversations')
					.doc(currentConversation.id)
					.collection('messages')
					.orderBy('timestamp', 'asc')
					.limitToLast(5)
					.get()
					.then(documentSet => {
						if (documentSet !== null) {
							documentSet.forEach(doc => {
								messages.push({
									id: doc.id,
									...doc.data(),
								});
							});
							setMessages(p => [...p, ...messages]);
							setLoadingMessages(false);
						}
						return messages;
					});
			}
		} catch (e) {
			setLoadingMessages(false);
			console.log(e);
		}
	};
	const getMoreMessages = () => {
		console.log('load more messages!');
	};
	// Probably will take out scrollToBottom entirely
	// useEffect(scrollToBottom, [currentConversation, messages]);
	useEffect(() => {
		getConversations();
		const unsubscribe = firestore.collection('conversations').onSnapshot(getConversations);

		// handles the cleanup
		return () => {
			unsubscribe();
		};
	}, [user]);

	useEffect(() => {
		if (currentConversation) {
			getMessages();
			const unsubscribe = firestore
				.collection('conversations')
				.doc(currentConversation.id)
				.onSnapshot(getMoreMessages);

			// handles the cleanup
			return () => {
				unsubscribe();
			};
		}
	}, [currentConversation]);

	useEffect(() => {
		if (currentConversation && !loadingMessages) {
			getMessages();
		}
	}, [currentConversation]);

	const setConversation = id => {
		let conversation = conversations.filter(convo => convo.id == id);
		setMessages(p => []);
		setCurrentConversation(conversation[0]);
	};
	useEffect(() => {
		if (conversations && conversations.length != 0 && !currentConversation) {
			setConversation(conversations[0].id);
		}
	}, [conversations]);

	// Redirect to /signin
	// if not signed in.
	useEffect(() => {
		if (auth.user === false) {
			router.push('/signin');
		}
	}, [auth, router]);
	if (!auth.user || loadingConversations) {
		return <LoadingPage />;
	}
	if (auth.user && !loadingConversations && conversations) {
		return (
			<div className="relative flex flex-col flex-grow flex-shrink-0 h-full antialiased">
				<div className="hidden md:block">
					<TopNav />
				</div>
				{!conversations && (
					<div className="flex justify-center items-center flex-grow">
						<span>
							{user.type == 'agent' &&
								"No leads yet. Once a lead requests to speak to you they'll appear here!"}
							{user.type !== 'agent' &&
								"You haven't spoken to any agents yet. Talk to one today!"}
						</span>
					</div>
				)}
				{conversations && (
					<div className="relative font-sans antialiased h-full mt-0 ml-4 mr-3 mb-2 rounded-lg  bg-white overflow-hidden flex">
						{/* DM Menu (conversation list) - shows on mobile and large screens - it's always the base */}
						<div
							className={`${
								currentConversation && 'hidden sm:flex'
							} flex relative h-full w-full z-10 sm:w-336px flex-col  sm:flex-shrink-0 bg-white overflow-hidden `}>
							{/* Menu Item (conversation snippet eventually) */}
							<div className="pb-20 sm:flex-1 sm:pb-8 overflow-y-scroll">
								{conversations &&
									conversations.map(conversation => {
										return (
											<ConversationSnippet
												setConversation={setConversation}
												conversation={conversation}
												user={user}
											/>
										);
									})}
							</div>
						</div>
						{/* chat view  */}
						<div className="relative z-30 pt-5 flex flex-col w-0 flex-1 overflow-hidden">
							<div className="relative flex-shrink-0 flex h-10 bg-white">
								<button
									onClick={() => setCurrentConversation(null)}
									className="block sm:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
									aria-label="Open sidebar">
									<svg
										className="h-6 w-6"
										stroke="currentColor"
										fill="text-gray-900"
										viewBox="0 0 24 24">
										<polygon points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9" />
									</svg>
								</button>
								<div className="flex-1 px-6 flex justify-between">
									<div className="flex-1 flex">
										<div className="max-w-7xl">
											<h1 className="text-2xl font-semibold text-gray-900">
												{currentConversation &&
													user.userType == 'agent' &&
													currentConversation.lead.name}
												{currentConversation &&
													user.userType !== 'agent' &&
													currentConversation.agent.name}
											</h1>
										</div>
									</div>
									<div className="ml-4 flex items-center md:ml-6"></div>
								</div>
							</div>
							<main
								className="flex-1 relative z-30 overflow-y-auto pb-6 focus:outline-none"
								tabindex="0">
								<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
									{/* <!-- Replace with your content --> */}
									<div className="py-4">
										{/* map over message docs and put into chat */}
										<div>Load more :)</div>
										{messages && messages.map(message => <Chat message={message} />)}
										<div ref={messagesEndRef} />
										<div>No more messages</div>
									</div>
									{/* <!-- /End replace --> */}
								</div>
							</main>
							<ChatInput
								value={messageValue}
								handleChangeValue={handleChangeValue}
								createMessage={createMessage}
							/>
						</div>
					</div>
				)}
				<div className={`${currentConversation && 'hidden sm:flex'} flex w-full md:hidden`}>
					<BottomNav />
				</div>
			</div>
		);
	}
};
export default Inbox;
