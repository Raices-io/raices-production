import { firestore, firebase } from '../util/firebase';
import Router from 'next/router';

const messageAgent = async (user, agentObj, homeTitle) => {
	console.log(user);

	if (!user) {
		Router.push('/signin');
		return;
	}

	const content = `Hi ${agentObj.displayName.split(' ')[0]} - I'm interested in ${homeTitle}`;
	const agent = agentObj;
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
	Router.push(`/messaging/chat/${chatId}`);
};

export default messageAgent;
