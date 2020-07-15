const admin = require('firebase-admin');

module.exports = {
	getHomes: async (data, context) => {
		try {
			const { city, direction, lastDoc = null, getCount = false, perPage = 2 } = data;
			console.log(data);
			let homes = [];
			let count = null;
			let homesRef = null;
			let lastDocument;
			if (!lastDoc) {
				console.log('no last doc');
				homesRef = await admin
					.firestore()
					.collection(`homes`)
					.where('city', '==', city)
					.orderBy('updated', 'desc')
					.limit(perPage)
					.get();
			} else if (direction === 'next') {
				console.log('NEXT');
				homesRef = await admin
					.firestore()
					.collection(`homes`)
					.where('city', '==', city)
					.orderBy('updated', 'desc')
					.startAfter(lastDoc)
					.limit(perPage)
					.get();
			} else {
				console.log('BACK');
				homesRef = await admin
					.firestore()
					.collection(`homes`)
					.where('city', '==', city)
					.orderBy('updated', 'desc')
					.endAt(lastDoc)
					.limit(limit)
					.get();
			}

			if (!homesRef.empty) {
				homesRef.forEach(home => homes.push({ docId: home.id, ...home.data() }));
				lastDocument = homesRef.docs[homesRef.docs.length - 1];
				lastDocument = lastDocument.data().title;

				console.log('homes found');
			} else {
				console.log('no docs@');
			}
			// if getCount, then get the total number of documents in the collection
			// we pass this as a variable because Firebase charges for every read
			if (getCount) {
				const homesRef = await admin
					.firestore()
					.collection(`homes`)
					.where('city', '==', city)
					.orderBy('updated', 'asc')
					.get();
				console.log('size!');
				console.log(homesRef.size);
				count = homesRef.size;
			}
			console.log('homes!');
			console.log(homes);
			return { homes, count, lastDocument };
		} catch (e) {
			console.log(e);
		}
	},
	getHome: async (data, context) => {
		let home = null;
		try {
			const { city, id } = data;
			let homeRef = await admin.firestore().collection(`homes`).doc(id).get();
			if (!homeRef.empty) {
				home = homeRef.data();
				let images = [];
				let imagesRef = await admin.firestore().collection('images').where('homeId', '==', id).get();
				if (!imagesRef.empty) {
					imagesRef.forEach(image => {
						images.push({ docId: image.id, ...image.data() });
					});
					home.images = images;
				} else {
					console.log('no images');
				}
				return { home };
			}
		} catch (e) {
			console.log(e);
			return { home };
		}
	},
};
