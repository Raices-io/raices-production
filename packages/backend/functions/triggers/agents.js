const admin = require('firebase-admin');

module.exports = {
	agentUpdated: async (change, context) => {
		if (!change.after) {
			return;
		}
		const agent = change.after.data();
		const { displayName, profilePic, uid, userType } = agent;
		if (userType !== 'agent') {
			return;
		}
		// find all the homes that have that agent's uid
		// update the agent.displayName and agent.profilePic on all those homes
		const homesRef = await admin.firestore().collection('homes').where('agent.uid', '==', uid).get();

		if (!homesRef.empty) {
			homesRef.forEach(home =>
				home.ref.update({
					'agent.displayName': displayName,
					'agent.profilePic': profilePic,
				}),
			);
		} else {
			console.log('no homes found');
		}
	},
};
