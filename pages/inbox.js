import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../util/auth';
import { useRouter } from 'next/router';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import ChatSnippet from '../components/Chat/ChatSnippet';
import firebase from '../util/firebase';
import EmptyInbox from '../components/Inbox/EmptyInbox';
import styled from 'styled-components';

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

const Inbox = () => {
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
	const chatsEndRef = useRef(null);
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
	const [loading, setLoading] = useState(false);
	const [chats, setChats] = useState([]);
	const [lastChat, setLastChat] = useState(null);
	const [empty, setEmpty] = useState(false);
	const [lastScroll, setLastScroll] = useState(null);
	const [scrollingUp, setScrollingUp] = useState(false);
	const [more, setMore] = useState(true);
	// handles our scroll event and determines if we're headed up or down
	const handleScroll = () => {
		if (scroller) {
			let currentScroll = scroller.current.scrollTop;
			console.log(currentScroll);
			if (lastScroll - currentScroll < 0) {
				setScrollingUp(p => false);
			} else {
				setScrollingUp(p => true);
			}
			setLastScroll(p => currentScroll);
			// if we're near the top of the array, and we're not already loading data
			// and if there's more to be had and we're scrolling up -> load data!
			if (
				scroller.current.scrollHeight - scroller.current.scrollTop ===
					scroller.current.clientHeight &&
				!loading &&
				!scrollingUp &&
				more
			) {
				getMoreChats(lastChat);
			}
		}
	};
	const getMoreChats = async chat => {
		setLoading(p => true);
		await firestore
			.collection('chats')
			.where('userIds', 'array-contains', user.uid)
			.orderBy('lastDate', 'desc')
			.startAfter(chat.data().lastDate)
			.get()
			.then(snapshot => {
				let chats = [];
				if (snapshot.empty) {
					console.log('no matching documents');
					setLoading(p => false);
					setMore(p => false);
					return;
				}
				snapshot.forEach(doc => {
					chats.push({ id: doc.id, ...doc.data() });
					setLastChat(p => snapshot.docs[snapshot.docs.length - 1]);
				});
				setChats(p => [...p, ...chats]);
				setLoading(p => false);
			});
	};

	const getChats = async () => {
		setLoading(p => true);
		try {
			if (user) {
				setLoading(p => true);
				const unsubscribe = await firestore
					.collection('chats')
					.where('userIds', 'array-contains', user.uid)
					.orderBy('lastDate', 'desc')
					.limit(10)
					.onSnapshot(querySnapshot => {
						if (querySnapshot.empty) {
							setEmpty(true);
							setLoading(false);
							return;
						}
						let newChats = [];
						querySnapshot.docChanges().forEach(change => {
							if (change.type === 'added') {
								newChats.push({ id: change.doc.id, ...change.doc.data() });
								if (chats.length == 0) {
									setLastChat(p => change.doc);
								}
							}
						});
						setChats(p => {
							if (p.length == 0) {
								return newChats;
							} else {
								return [...newChats, ...p];
							}
						});
						setLoading(p => false);
					});
				// handles the cleanup
				return () => {
					unsubscribe();
				};
			}
		} catch (e) {
			setLoading(p => false);
			console.log(e);
		}
	};
	// if not signed in redirect to sign in page
	useEffect(() => {
		if (user == false) {
			router.push('/signin');
		}
	}, [auth, router]);
	// get the intial 5 chats and set a listener
	useEffect(() => {
		if (user) {
			getChats();
		}
	}, [user]);

	if (!auth.user) {
		return (
			<div className="h-screen w-screen bg-white">
				<LoadingAnimation />
			</div>
		);
	}
	// {empty && <EmptyInbox user={user} />}
	return (
		<div
			className={`relative flex flex-col items-center w-screen h-full flex-grow overflow-y-scroll antialiased`}>
			<div className="z-40 hidden md:block px-12 mt-12">
				<TopNav fixed />
			</div>
			{loading && (
				<div className="h-screen w-screen bg-white">
					<LoadingAnimation />
				</div>
			)}
			{empty && <EmptyInbox user={user} />}
			<div className="max-w-screen-md flex-grow">
				<Scroller className="scroller" ref={scroller} onScroll={handleScroll}>
					{chats.map((chat, i) => {
						if (chat.users[0].id !== chat.users[1].id) {
							console.log('not same');
							return (
								<ChatSnippet
									id={chat.id}
									img={chats[i].users.filter(u => u.id !== user.uid)[0].profilePic}
									name={chats[i].users.filter(u => u.id !== user.uid)[0].name}
									content={chat.lastContent}
									lastDate={chat.lastDate}
								/>
							);
						} else {
							return (
								<ChatSnippet
									id={chat.id}
									img={auth.user.profilePic}
									name={auth.user.displayName}
									content={chat.lastContent}
									lastDate={chat.lastDate}
								/>
							);
						}
					})}
					<span ref={chatsEndRef} />
				</Scroller>
			</div>
			<div className="flex w-full md:hidden">
				<BottomNav />
			</div>
		</div>
	);
};

export default Inbox;
export { LoadingAnimation };
