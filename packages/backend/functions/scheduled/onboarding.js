const admin = require('firebase-admin');
const moment = require('moment-timezone');
const postmark = require('postmark');
const functions = require('firebase-functions');
var client = new postmark.ServerClient(functions.config().postmark.api_key);

module.exports = {
	// schedSendAgentAddHomeEmail
	sendAgentAddHomeEmail: async context => {
		console.log('running scheduled function :)');
		const now = new Date();
		const agents = await admin
			.firestore()
			.collection('users')
			.where('userType', '==', 'agent')
			.where('optedOut', '==', false)
			.where('onboarding.addedHome', '==', false)
			.where('responded', '==', false)
			.where('sendsAt', '<', now)
			.get();
		if (agents.empty) {
			console.log('no emails to send');
			return;
		}
		for (let i = 0; i < agents.docs.length; i++) {
			// idempotency
			if (sendEmail == true) {
				return;
			}
			let agent = agents.docs[i].data();
			let createdAt = agent.createdAt.seconds;
			let nextSendsAt = '';
			// Sort the array by order
			let id = agents.docs[i].id;
			if (agent.onboarding.onboardingEmails) {
				let sorted = agent.onboarding.onboardingEmails
					.filter(email => email.sent !== true)
					.sort((a, b) => a.dayOffset - b.dayOffset);
				let updated = agent.onboarding.onboardingEmails;

				// if no errors, adjust sent to true
				updated.forEach(email => {
					if (email.dayOffset == sorted[0].dayOffset) {
						email.sent = true;
					}
				});
				// update user email obj with new array
				let agentRef = admin.firestore().collection('users').doc(id);
				agentRef.update({
					sendingEmail: true,
				});
				// Send the email!
				let template = {
					name: agent.displayName.split(' ')[0],
				};
				try {
					client.sendEmailWithTemplate({
						From: 'cris@raices.io',
						To: agent.email,
						TemplateAlias: sorted[0].templateAlias,
						TemplateModel: template,
					});
				} catch (e) {
					console.log(e);
				}
				// set the new sendsAt to the createdAt + offset
				// random sets the emails to go out inbetween 9 and 11 in the morning at random times
				if (sorted.length > 1) {
					// this is the not last email in the chain
					nextSendsAt = moment
						.unix(createdAt)
						.add(sorted[1].dayOffset, 'days')
						.set('hour', Math.random() * (11 - 9) + 9)
						.set('minute', Math.random() * (59 - 1) + 1)
						.tz('America/Bogota')
						.toDate();
				}

				if (nextSendsAt !== '') {
					agentRef.update({
						sendsAt: admin.firestore.Timestamp.fromDate(nextSendsAt),
						'onboarding.onboardingEmails': updated,
					});
				} else {
					agentRef.update({
						sendsAt: false,
						'onboarding.onboardingEmails': updated,
						sendingEmail: false,
					});
				}
			}
		}
	},
};
