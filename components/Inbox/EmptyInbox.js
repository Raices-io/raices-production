import React from 'react';
import LargeShowingCard from '../Cards/LargeShowingCard';

import firebase from '../../util/firebase';

const EmptyInbox = ({ user }) => {
	const firestore = firebase.firestore();
	const agent = {
		profilePic:
			'https://firebasestorage.googleapis.com/v0/b/raices-production.appspot.com/o/userImages%2Fcami.jpg?alt=media&token=d9c7185d-54b6-416e-b74e-065e9270009d',
		displayName: 'Cami A',
	};
	const messageAgent = async agent => {
		let data = {
			lastMessage: {
				content: `Hola ${home.agent.displayName.split(' ')[0]}`,
				fromLead: true,
				timestamp: firebase.firestore.Timestamp.now(),
			},
			lead: {
				name: user.displayName,
			},
			agent: {
				name: agent.displayName,
			},
			userId: agent.uid,
			leadId: user.uid,
		};
		// create a new conversation
		const conversationRef = await firestore.collection('conversations').add(data);

		// add a message to that conversation
		let convoId = conversationRef.id;
		await firestore.collection('conversations').doc(convoId).update({ id: convoId });

		let messagesRef = conversationRef.collection('messages').add({
			content: `Hi ${home.agent.displayName.split(' ')[0]}, quiero ver ${home.address}`,
			timestamp: firebase.firestore.Timestamp.now(),
			uid: user.uid,
			from: {
				name: user.displayName,
				picture: user.profilePic,
			},
			fromLead: true,
		});
		// redirect to the /inbox page
	};

	return (
		<div className="sm:py-6 mb-10 sm:pb-12 flex flex-col h-full flex-grow mx-0  flex-grow">
			<div className="bg-gray-100">
				<div className="pt-12 sm:pt-16 lg:pt-20">
					<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">
								No hay mensajes (todavía)
							</h2>
							<p className="mt-4 text-xl leading-7 text-gray-500">
								Para empezar una conversación, encuentra una propiedad o agente inmobiliario
								que te guste y has clic en “planea una visita”
							</p>
						</div>
					</div>
				</div>
				<div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
					<div className="relative">
						<div className="absolute inset-0 h-1/2 bg-gray-100"></div>
						<div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
							<LargeShowingCard agent={agent} messageAgent={() => messageAgent(agent)} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyInbox;
