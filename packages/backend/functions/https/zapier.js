const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = {
	// requestEmailReceived
	emailReceived: async (req, res) => {
		const { fromEmail, toEmail } = req.body;
		// see if we have any users with that email
		const userRef = await admin
			.firestore()
			.collection('users')
			.where('email', '==', fromEmail.toLowerCase().trim())
			.get();
		if (userRef.empty) {
			console.log('no user found');
			return res.end();
		} else {
			const user = userRef.docs[0].data();
			const { userType } = user;
			// if yes and userType = agent, set responded = true
			if (userType === 'agent') {
				await admin.firestore().collection('users').doc(userRef.docs[0].id).update({
					responded: true,
				});
			}
		}
		return res.end();
	},
};
