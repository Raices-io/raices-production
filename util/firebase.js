import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
// Make sure it hasn't already been initialized
if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
		appID: process.env.FIREBASE_APP_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	});
	if (process.env.NODE_ENV == 'development' && process.env.FIREBASE_FUNCTIONS_EMULATOR_URL) {
		firebase.functions().useFunctionsEmulator(process.env.FIREBASE_FUNCTIONS_EMULATOR_URL);
	}
}

export default firebase;
