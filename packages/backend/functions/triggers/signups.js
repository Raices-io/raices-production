const functions = require('firebase-functions');
const admin = require('firebase-admin');
const postmark = require('postmark');
var client = new postmark.ServerClient(functions.config().postmark.api_key);

module.exports = {
	// triggerUserSignedUp
	agentSignups: async (change, context) => {
		if (!change.after) {
			return;
		}

		const before = change.before.data();
		const after = change.after.data();
		if (after.optedOut) {
			// don't send if they've opted out of comms
			return;
		}
		let template = {
			name: after.displayName.split(' ')[0],
		};
		if (before.agentSignups == 0 && after.agentSignups == 1) {
			// send email invite 1
			try {
				client.sendEmailWithTemplate({
					From: 'cris@raices.io',
					To: after.email,
					TemplateAlias: 'invite_promo_1',
					TemplateModel: template,
				});
			} catch (e) {
				console.log(e);
			}
			// add one tour to the agent's profile
			await admin.firestore().collection('users').doc(change.after.id).update({
				tours: 1,
			});
			return;
		}
		if (before.agentSignups == 1 && after.agentSignups == 2) {
			// send email invite 2
			try {
				client.sendEmailWithTemplate({
					From: 'cris@raices.io',
					To: after.email,
					TemplateAlias: 'invite_promo_2',
					TemplateModel: template,
				});
			} catch (e) {
				console.log(e);
			}

			return;
		}
		if (before.agentSignups == 2 && after.agentSignups == 3) {
			// send email invite 3
			try {
				client.sendEmailWithTemplate({
					From: 'cris@raices.io',
					To: after.email,
					TemplateAlias: 'invite_promo_3',
					TemplateModel: template,
				});
			} catch (e) {
				console.log(e);
			}
			// add 5 tours to the agent's profile
			// add one tour to the agent's profile
			await admin
				.firestore()
				.collection('users')
				.doc(change.after.id)
				.update({
					tours: after.tours + 5,
				});
			return;
		}
		if (before.agentSignups == 4 && after.agentSignups == 5) {
			// send email invite 4 - champagne
			try {
				client.sendEmailWithTemplate({
					From: 'cris@raices.io',
					To: after.email,
					TemplateAlias: 'invite_promo_4',
					TemplateModel: template,
				});
			} catch (e) {
				console.log(e);
			}
			// add champagne:true to the agent's profile
			await admin.firestore().collection('users').doc(change.after.id).update({
				champagne: 1,
			});
			return;
		}
	},
};
