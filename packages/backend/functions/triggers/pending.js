const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = {
	homeCreated: async (snap, context) => {
		const home = snap.data();
		// find the user who created the home
		const { userId } = home;
		// if user is 'agent' and onboarding.addedHome = false, then set to true
		const userRef = await admin.firestore().collection('users').doc(userId).get();
		if (userRef.empty) {
			throw new Error('not a user!');
		} else {
			const user = userRef.data();
			if (user.userType == 'agent' && !user.onboarding.addedHome) {
				await admin.firestore().collection('users').doc(userId).update({
					'onboarding.addedHome': true,
				});
			}
		}
		return;
	},
};
