/** TODO 
receiving message when in system
**/

/** load SDK modules **/
// Cloud Functions SDK
const functions = require('firebase-functions');
// Admin SDK (-> access to Realtime DB)
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.cert({
	    projectId: 'fireba-a8775',
	    clientEmail: 'firebase-adminsdk-zl5qt@fireba-a8775.iam.gserviceaccount.com',
	    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD2/tmDOmbcV/Tw\nY13WknnlPcqvqmTJzSxr6w/6xZYqa5TcGzuOltAC1M29jFoxvyiJ4EhylxwFePb2\nXkfyHhjA/FIcPux1hL3mtaB5QDcgr7IkRRLCySSIkWGt++HHuPJMVu276rkxuCU9\n+ymAWKpcSOSN0aHBHsGqQ5xjcM6IKVtrRtW63sSfkINXc1youeOg/hcIcROi4sXs\nt5850wOKSZlmthPH6CJUu6CUS8hpXmq0u9ySSmxXIzPawFdZBcq6t3Kec6UbcNdT\nbpWCXxuuVOp3pTkyDvs7LwS8gyLIzS3DmK/KH/eNhdk35eJwfu8vmmo2VemrhACs\nbU8R+3hfAgMBAAECggEABh+gLOZQK1S5Ud+X/mKrR8lJMrzt7fYUP9vk2lOQh+sa\n40oZjYA+FmCuqSBg30YQYm3l3esF9GzHUqklVEj171lSGWxfi5pUfiYxA4PADVaa\nlNbRj3RR+Sc0w/RJ6LW0Uogx/kXkSYNGb37zZg2ZfttslZRShxzIGGLzIaDOV6A1\nl8JxNzuoqsAu+QejkfEnDCvBBLPnvoOb+xoxaKeES420VOjVUvtIfhzb/KMgaldj\nqTyjXE5dbJa16enIGyiMa7gud1vXfxxGzLAsmU7xU9T3K5A4u6+OxWiTFKN+AbHZ\n1mjMjzWwRv7gGK0qgmYsTnsLPyUQP79ghNrXb57yoQKBgQD/CMF3jIeGLvZ7rGTj\nb8Fg9ZGygpJwEKw4Xk+m7fQu80RXzXZKtyYsotdQs7SpwC5Y3521z4Y5FkaYOL7D\n4t/WuusVyxZhWgU8JtdHJj44H7Y0e2SSmn9ULOXCl3Acw9b/S9nNTLtwnWn9dzfu\nzSA1syKOOPS9iNSOlNsKAfd3GwKBgQD37kz/YeHI1lAlumachLyby+FNYm5jKI/n\noVlEnCRiaZS3CkFS/UA3BN6PrEtzw09kS01TGzsq2NoyaXWZPNHyUYHnK7y8a76f\nLoRyzkXIhjEU8ODPEUaprTUj1CAX+6gbRIiYX4stluAhJhLqweRJE3Kr35Vzedec\nyQTtEooEDQKBgEBPZunMiAgwI3uAN1iav7rBceH/xwl3StZUAeXoLyD/uwYhC2k/\n0eKDlaQGDNKZYZaLnOtRz1jp4xdTh9dBiIxPSiSOt7AI0TUf3j1UyW/Bn2KQkwXc\n66rAP5fYNC8suzRZXizE4qc9KpL90x7mnu6ro1UVy7FXpbHmm21knZBtAoGBANya\nG8bMiELUdoHrZmv0K4IQmcrqP0BZkhnO1ggXSsSKHznylQdLsXyDB6kc7BH4AcdC\nvW2p+C56v0NF1M5hcIlE/un7X7bjw7wNfupMIYl35Wo1nkKAo7hMFtFnaJsOX5jL\nlSLHOKZ67bhxETnzBbYD6O+HRIp4KmIl9w0ehtFtAoGAcMKknq0uew8ZxlyT96/o\nvPaDKKG7Tu64OBXHnMaryWkw+l5YjcMpWRjWQmHJ+fzJD4mY9eutCJ9xqTbDjpUm\nahVehh8OcfekEnwaSH18iC42POV3FrL0lnxEFOJPpl1utMSCGDy/Yp5nNGoFtqMi\njKmTWirbxlzEeurSvN2ZWm4=\n-----END PRIVATE KEY-----\n'
	  }),
	  databaseURL: 'https://fireba-a8775.firebaseio.com/'
});

const title = 'バーチャル自習室～オキ朗～';
const text = '自習室に参加者が増えました！'
const img = '/images/okirou-256.png';
const url = 'https://fireba-a8775.firebaseapp.com/study-rooms.html';

/*
exports.notify1_1 = functions.region('asia-northeast1').database.ref('room1-1').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '生活･福祉' + text,
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);


exports.notify1_2 = functions.region('asia-northeast1').database.ref('room1-2').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '心理･教育･発達' + text,
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);

exports.notify1_3 = functions.region('asia-northeast1').database.ref('room1-3').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '社会･産業･経営' + text,
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);

exports.notify1_4 = functions.region('asia-northeast1').database.ref('room1-4').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '人間･文化' + text,
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);

exports.notify1_5 = functions.region('asia-northeast1').database.ref('room1-5').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '情報' + text,
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);

exports.notify1_6 = functions.region('asia-northeast1').database.ref('room1-6').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '自然･環境' + text,
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);

exports.notify2_1 = functions.region('asia-northeast1').database.ref('room2-1').onCreate(
	async (snapshot) => {
		// notification details
		const payload = {
			notification: {
				title: title,
				body: '大部屋に参加者が増えました！',
				icon: img,
				click_action: url // opens link in new tab
			}
		};

		// get list of device tokens
		const allTokens = await admin.database().ref('fcmTokens').once('value');
		if (allTokens.exists()) {
			// listing all tokens to send notification
			const tokens = Object.keys(allTokens.val());

			// send notification to all tokens
			const response = await admin.messaging().sendToDevice(tokens, payload);
			await cleanupTokens(response, tokens);
			console.log('notifications sent & tokens cleaned up');
		}
		
	}
);
*/

/*
function terminateNotification() {
	// get list of device tokens
	const allTokens = await admin.database().ref('fcmTokens').once('value');
	if (allTokens.exists()) {
		// listing all tokens to send notification
		const tokens = Object.keys(allTokens.val());

		// send notification to all tokens
		const response = await admin.messaging().sendToDevice(tokens, payload);
		await cleanupTokens(response, tokens);
		console.log('notifications sent & tokens cleaned up');
	}
}
*/

function cleanupTokens(response, tokens) {
	// check each notification for error
	const tokensToRemove = {};
	response.results.forEach((result, index) => {
		const error = result.error;
		if (error) {
			console.error('failed to send notification to: ', tokens[index], error);
			// clean up tokens not registered anymore
			if (error.code === 'messaging/invalid-registration-token' || 
				error.code === 'messaging/registration-token-not-registered' ) {
				tokensToRemove['/fcmTokens/${tokens}[index]'] = null;
			}
		}
	});
	return admin.database().ref().update(tokensToRemove);
}