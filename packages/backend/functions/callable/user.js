const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { user } = require('firebase-functions/lib/providers/auth');
const moment = require('moment-timezone');
var postmark = require('postmark');

var client = new postmark.ServerClient(functions.config().postmark.api_key);

module.exports = {
	sendAgentInvite: async (data, context) => {
		const { inviterEmail, inviteeEmail, uid, inviterName } = data;
		try {
			// send invitee the email
			const template = {
				inviterName,
			};
			client.sendEmailWithTemplate({
				From: 'ayuda@raices.io',
				To: inviteeEmail,
				Cc: `${inviterEmail}`,
				TemplateAlias: 'agent_invite_email',
				TemplateModel: template,
			});
			//  add email to user obj, agentsInvited
			admin
				.firestore()
				.collection('users')
				.doc(uid)
				.update({
					agentsInvited: admin.firestore.FieldValue.arrayUnion(inviteeEmail),
				});
			// return true
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	updateUser: async (data, context) => {
		const { user } = data;
		try {
			let userRef = await admin.firestore().collection('users').doc(user.uid);

			await userRef.update({ ...user });
			return true;
		} catch (e) {
			console.log(e);
			return null;
		}
	},
	addRole: async (data, context) => {
		let onboarding = {};
		try {
			const user = await admin.auth().getUserByEmail(data.email);
			console.log('user id is');
			console.log(user.uid);
			await admin.auth().setCustomUserClaims(user.uid, { role: data.role });

			const dbUserSnap = admin.firestore().collection('users').doc(user.uid);
			await dbUserSnap.update({
				userType: data.role,
			});
			if (data.role == 'agent') {
				onboarding.addedHome = false;
				onboarding.receivedLead = false;
				// add onboarding email templates
				onboarding.onboardingEmails = [
					{
						dayOffset: 0,
						sent: false,
						templateAlias: 'add_home_email_1',
					},
					{
						dayOffset: 1,
						sent: false,
						templateAlias: 'add_home_email_2',
					},
					{
						dayOffset: 2,
						sent: false,
						templateAlias: 'add_home_email_3',
					},
					{
						dayOffset: 3,
						sent: false,
						templateAlias: 'add_home_email_4',
					},
				];
				const nextSendsAt = moment()
					.add(1, 'days')
					.set('hour', Math.random() * (11 - 9) + 9)
					.set('minute', Math.random() * (59 - 1) + 1)
					.tz('America/Bogota')
					.toDate();
				dbUserSnap.update({
					onboarding,
					agentsInvited: 0,
					tours: 0,
					agentSignups: 0,
					agentsInvited: [],
					agentsSignedUp: [],
					responded: false,
					sendsAt: nextSendsAt,
				});
				// Run check Agent Invites
				const inviter = await admin
					.firestore()
					.collection('users')
					.where('agentsInvited', 'array-contains', data.email)
					.limit(1)
					.get();
				if (inviter.empty) {
					console.log('none found');
				} else {
					console.log(inviter.docs[0].data());
					//  once found (limit 1), then agentSignups++
					await admin
						.firestore()
						.collection('users')
						.doc(inviter.docs[0].id)
						.update({
							agentSignups: admin.firestore.FieldValue.increment(1),
							agentsSignedUp: admin.firestore.FieldValue.arrayUnion(data.email),
						});
				}
			}
			return { message: 'Role was added successfully' };
		} catch (e) {
			return console.error(e);
		}
	},
};
