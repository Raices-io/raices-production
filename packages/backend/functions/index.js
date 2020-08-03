const functions = require('firebase-functions');
const { auth, firestore, https, pubsub } = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Homes
const c = require('./callable');
exports.callGetHomes = https.onCall(c.homes.getHomes);
exports.callGetHome = https.onCall(c.homes.getHome);

// User
exports.callUpdateUser = https.onCall(c.user.updateUser);
exports.callAddRole = functions.https.onCall(c.user.addRole);

// agent signups
exports.callCheckAgentInvites = https.onCall(c.user.checkAgentInvites);
exports.callSendAgentInvite = https.onCall(c.user.sendAgentInvite);
// Messages
exports.callGetMessages = https.onCall(c.messages.getMessages);

// Emails
exports.callSendWelcomeEmail = https.onCall(c.emails.sendWelcomeEmail);

// https
const h = require('./https');
exports.requestEmailReceived = https.onRequest(h.zapier.emailReceived);

// triggers
const t = require('./triggers');
exports.triggerHomeCreated = firestore
	.document('pendingHomes/{pendingHomeId}')
	.onDelete(t.pending.homeCreated);

exports.triggerImageResizing = functions.storage.object().onFinalize(t.imageResizing.imageResizing);

exports.triggerAgentSignups = firestore.document('users/{userId}').onUpdate(t.signups.agentSignups);
exports.triggerAgentUpdated = firestore.document('users/{userId}').onUpdate(t.agents.agentUpdated);
// Scheduled
const s = require('./scheduled');
exports.schedSendAgentAddHomeEmail = pubsub.schedule('0 * * * *').onRun(s.onboarding.sendAgentAddHomeEmail);
