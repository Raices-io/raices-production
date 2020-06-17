import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../../util/auth';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { firebase } from '../../../../util/firebase';
import ChatInput from '../../../../components/Chat/ChatInput';
import moment from 'moment';
import styled from 'styled-components';
import Link from 'next/link';

moment().format();

const EmptyHolder = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	overflow-y: scroll;
	height: 100%;
	padding: 1rem 1rem 10px 1rem;
	background: pink;
`;

const LoadingAnimation = styled.div`
	span {
		width: 15px;
		height: 15px;
		margin: 0 5px;
		background-color: #4c51bf;
		border-radius: 50%;
		display: inline-block;
		animation-name: dots;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
	}
	span:nth-child(2) {
		animation-delay: 0.4s;
	}
	span:nth-child(3) {
		animation-delay: 0.8s;
	}
	@keyframes dots {
		50% {
			opacity: 0;
			transform: scale(0.7) translateY(10px);
		}
	}
`;

// flex flex-grow flex-col overflow-y-scroll h-full pb-2 first:mt-auto
const Scroller = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	overflow-y: scroll;
	height: 100%;
	padding: 1rem 1rem 10px 1rem;
	&:first-child {
		margin-top: auto;
	}
	background: white;
`;

const useKey = key => {
	const [pressed, setPressed] = useState(false);

	const match = event => {
		return key.toLowerCase() === event.key.toLowerCase();
	};

	const onDown = event => {
		if (event.key.toLowerCase() === 'enter') {
			// prevent the enter key from line breaking
			event.preventDefault();
			setPressed(true);
			return;
		} else if (event.key.toLowerCase() === 'enter') {
			return;
		}
		if (match(event)) setPressed(true);
	};

	const onUp = event => {
		if (match(event)) setPressed(false);
	};
	useEffect(() => {
		window.addEventListener('keydown', onDown);
		window.addEventListener('keyup', onUp);
		return () => {
			window.removeEventListener('keydown', onDown);
			window.removeEventListener('keyup', onUp);
		};
	}, [key]);

	return pressed;
};

const Chat = () => {
	// ****
	// ROUTER
	// ****
	const router = useRouter();
	// Chat ID pulled in from our route
	let { chatId } = router.query;
	// ****
	// REFS
	// ****
	// Ref for our infinite scrolling component
	const scroller = useRef(null);
	// Ref for the end of our messages
	const messagesEndRef = useRef(null);
	// ****
	// AUTH
	// ****
	const auth = useAuth();
	const user = auth.user;
	// ****
	// KEYDOWN LISTENERS
	// ****
	const enter = useKey('enter');
	// ****
	// FIRESTORE
	// ****
	const firestore = firebase.firestore();
	// ****
	// STATE
	// ****
	const [messages, setMessages] = useState([]); // State to hold our messages loaded from the db
	const [lastScroll, setLastScroll] = useState(0); // Holds last scroll state to determine if we're headed up or down
	const [scrollingUp, setScrollingUp] = useState(true); // Boolean to track scrolling up or down
	const [lastMessage, setLastMessage] = useState(null); // Last message used for pagination in Firebase
	const [fetchMoreData, setFetchMoreData] = useState(false); // Fetch more data to determine if we should scroll to bottom on messages added
	const [loading, setLoading] = useState(false); // loading from db or not
	const [more, setMore] = useState(true); // Tracks if there are more records to pull from the db
	const [otherUsers, setOtherUsers] = useState([]); // stores users in the chat that aren't the logged in user
	const [messageValue, setMessageValue] = useState(''); // tracks state for chat input component

	// Changes value of the chat input component to send a message
	const handleChangeValue = e => {
		setMessageValue(e.target.value);
	};
	// Creates a message in firestore
	const createMessage = async () => {
		const messagesRef = await firestore.collection('messages');
		messagesRef.add({
			chatId,
			content: messageValue,
			createdAt: firebase.firestore.Timestamp.now(),
			user: {
				id: user.uid,
				name: user.displayName,
				profilePic: user.profilePic,
			},
			userId: user.uid,
		});
		setMessageValue('');
	};
	// Determines if there is actual text in the input, as opposed to just spaces
	const text = messageValue.replace(/\s/g, '').length !== 0;
	// loads more messages on scroll up
	const getMoreMessages = async message => {
		setLoading(p => true);
		setScrollingUp(p => false);
		try {
			await firestore
				.collection('messages')
				.where('chatId', '==', chatId)
				.orderBy('createdAt', 'desc')
				.startAfter(message.data().createdAt)
				.limit(20)
				.get()
				.then(snapshot => {
					setFetchMoreData(p => true);
					let messages = [];
					if (snapshot.empty) {
						setLoading(p => false);
						setMore(p => false);
						setFetchMoreData(p => false);
						return;
					}
					snapshot.forEach(doc => {
						messages.push({ id: doc.id, ...doc.data() });
						setLastMessage(p => snapshot.docs[snapshot.docs.length - 1]);
					});
					// prevents the browser from scrolling to the top of recently added messages
					const currentHeight = scroller.current.scrollHeight; // snapshot of the old element height
					setMessages(p => [...messages.reverse(), ...p]);
					// let items render, then sets the scrollHeight for the element
					scroller.current.scrollTop = scroller.current.scrollHeight - currentHeight;
					setLoading(p => false);
					setFetchMoreData(p => false);
				});
		} catch (e) {
			console.log(e);
			setLoading(p => false);
		}
	};

	const getMessages = async () => {
		setLoading(p => true);
		try {
			const unsubscribe = await firestore
				.collection('messages')
				.where('chatId', '==', chatId)
				.orderBy('createdAt', 'desc')
				.limit(20)
				.onSnapshot(querySnapshot => {
					if (querySnapshot.empty) {
						setEmpty(true);
						setLoading(false);
						return;
					}
					let newMessages = [];
					querySnapshot.docChanges().forEach(change => {
						if (change.type === 'added') {
							newMessages.push({ id: change.doc.id, ...change.doc.data() });
							if (messages.length == 0) {
								setLastMessage(p => change.doc);
							}
						}
					});
					setMessages(p => {
						if (p.length == 0) {
							return newMessages.reverse();
						} else {
							return [...p, ...newMessages];
						}
					});
					// first snapshot comes in with the entire limit's worth of messages
					// so if it's more than one it's the initial seed of data
					if (newMessages.length > 1 && messagesEndRef.current) {
						messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
					}
					setLoading(p => false);
				});
			return () => {
				unsubscribe();
			};
		} catch (e) {
			setLoading(false);
			console.log(e);
		}
	};
	// handles our scroll event and determines if we're headed up or down
	const handleScroll = () => {
		if (scroller) {
			let currentScroll = scroller.current.scrollTop;
			if (lastScroll - currentScroll < 0) {
				setScrollingUp(p => false);
			} else {
				setScrollingUp(p => true);
			}
			setLastScroll(p => currentScroll);
			// if we're near the top of the array, and we're not already loading data
			// and if there's more to be had and we're scrolling up -> load data!
			if (currentScroll < 50 && !loading && scrollingUp && more) {
				getMoreMessages(lastMessage);
			}
		}
	};
	// scroll to bottom if we're pretty close to the bottom, and we're not fetching more data
	const scrollToBottom = () => {
		if (!fetchMoreData && scroller.current.scrollTop > 99) {
			messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
		}
	};
	// scroll to bottom on new messages being added
	useEffect(() => {
		let cancelled = false;
		const run = async () => {
			if (!cancelled && messagesEndRef.current) {
				scrollToBottom();
			}
		};
		run();
		return () => (cancelled = true);
	}, [messages]);
	// re route non-authed users
	useEffect(() => {
		if (user == false) {
			setLoading(true);
		}
	}, [auth, router]);
	// get messages when the page loads
	useEffect(() => {
		let cancelled = false;
		const run = async () => {
			if (!cancelled && user) {
				getMessages();
			}
		};
		run();
		return () => {
			cancelled = true;
		};
	}, [user]);
	// set the other users array from the incoming messages
	useEffect(() => {
		setOtherUsers(p => messages.filter(message => message.userId !== user.uid));
	}, [messages]);
	// on detecting 'enter' keydown we submit the message if there's actual text (and not just spaces)
	useEffect(() => {
		if (text) {
			createMessage();
		}
	}, [enter]);

	if (!auth.user) {
		return (
			<div className="h-screen w-screen bg-white">
				<LoadingAnimation />
			</div>
		);
	}
	return (
		<div className=" flex flex-col h-full">
			<div className="px-4 flex flex-col h-12 ">
				<Link href={'/inbox'}>
					<div className="ml-4 flex text-gray-600 items-center absolute top-2 cursor-pointer">
						<svg
							className="h-6 w-6 self-start"
							stroke="currentColor"
							fill="text-grey-600"
							viewBox="0 0 24 24">
							<path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
						</svg>
					</div>
				</Link>
				<div className="flex items-center justify-center border-b h-10 border-t border-gray-200">
					{otherUsers.length > 0 ? otherUsers[0].user.name : ''}
				</div>
			</div>
			<Scroller className="scroller" ref={scroller} loading={loading} onScroll={handleScroll}>
				<div className="max-w-screen-md self-center flex flex-col w-full">
					{messages.map((message, i) => {
						return (
							<div key={message.id} className="mt-3 flex-shrink-0 first:mt-auto flex ">
								{/* Image */}
								<img src={message.user.profilePic} className="ml-4 rounded-full h-10 w-10" />
								<div className="mx-4 w-full flex flex-col">
									<div className="flex w-full items-baseline">
										<span className="font-semibold">{message.user.name}</span>
										<span className="text-xs text-gray-500 ml-3">
											{moment().diff(moment.unix(message.createdAt.seconds)) < 0
												? moment.unix(message.createdAt.seconds).format('ddd, h:mmA')
												: moment.unix(message.createdAt.seconds).format('h:mmA')}
										</span>
									</div>
									<div className="w-full font-normal text-gray-600">{message.content}</div>
								</div>
								{/*  */}
							</div>
						);
					})}
				</div>
				<span ref={messagesEndRef} />
			</Scroller>
			<div className="max-w-screen-md flex w-full self-center">
				<ChatInput
					value={messageValue}
					handleChangeValue={handleChangeValue}
					createMessage={createMessage}
				/>
			</div>
		</div>
	);
};
export default Chat;
