const admin = require('firebase-admin');
const functions = require('firebase-functions');
var postmark = require('postmark');

var client = new postmark.ServerClient(functions.config().postmark.api_key);

module.exports = {
	sendWelcomeEmail: async (data, context) => {
		const { userType, name, email } = data;

		let template = {};
		let templateId;
		if (userType == 'agent') {
			template = {
				product_name: 'Raíces',
				name: name,
				action_url: 'https://www.raices.io/add-home',
			};
			templateId = '18168022';
		} else {
			template = {
				product_name: 'Raíces',
				name: name,
				action_url: 'https://www.raices.io/homes/Medellin',
			};
			templateId = '18167646';
		}
		try {
			client.sendEmailWithTemplate({
				From: 'ayuda@raices.io',
				To: email,
				TemplateId: templateId,
				TemplateModel: template,
			});
		} catch (e) {
			console.log(e);
		}
	},
};
