const admin = require('firebase-admin');

module.exports = {
	getMessages: async (data, context) => {
		const { conversationId, lastTimestamp = null } = data;
		try {
			let messages = [];
			let messagesRef;
			if (lastTimestamp) {
				messagesRef = await admin
					.firestore()
					.collection('conversations')
					.doc(conversationId)
					.collection('messages')
					.orderBy('timestamp', 'asc')
					.endBefore(lastTimestamp)
					.limitToLast(5)
					.get();
			} else {
				messagesRef = await admin
					.firestore()
					.collection('conversations')
					.doc(conversationId)
					.collection('messages')
					.orderBy('timestamp', 'asc')
					.limitToLast(5)
					.get();
			}
			if (!messagesRef.empty) {
				messagesRef.forEach(message => {
					messages.push({ docId: message.id, ...message.data() });
				});
			} else {
				console.log('no messages');
				return null;
			}
			return { messages: messages };
		} catch (e) {
			console.log(e);
		}
	},
};
