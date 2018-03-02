/*
function autoSignOut(user) {
	// get sign-out time
	var time = new Date().getTime();

	// DB: add record to /sign-out/user.uid
	var ref = firebase.database().ref('sign-out');
	ref.child(user.uid).set(time)
	.then(function() {
		// sign-out
		return firebase.auth().signOut();
	}).then(function() {
		// redirect to login page
		window.location.href = "/";
	}).catch(function(error) {
		console.log(error);
	});
}
*/

function checkTimeout(user) {
	// get sign-in time
	var ref = firebase.database().ref('sign-in/' + user.uid);
	ref.once('value')
	.then(function(snapshot) {
		return snapshot.val();
	}).then(function(ms) {
		var signIn = new Date(parseInt(ms));
		var timeout = new Date();
		timeout.setMinutes(signIn.getMinutes() + 30); // 30 minutes after last sign-in

		var i = setInterval(function() {
			var now = new Date();
			if (now > timeout) {
				clearInterval(i);
				signOut();
			}
		})
	})
}

function initTopnav(user) {
	var name = user.displayName;
	if (name != null) {
		$('#displayName').text(name);
	}

	// sign out user
	$('#sign-out').click(function() {
		//signOut(user);
		signOut(user);
	});
}

/*
function logUserAction(user, action) {
  var time = new Date().getTime();
  var ref = firebase.database().ref('user-logs/' + user.uid);
  return ref.child(time).set(action);
}
*/

function signOut(user) {
	/*
	var ref = firebase.database().ref('sign-out');
	// DB: remove record from /sign-out/user.uid
	ref.child(user.uid).remove()
	.then(function() {
		// redirect to login page
		window.location.href = "/";
	}).catch(function(error) {
		console.log(error);
	});
	*/

	firebase.auth().signOut()
	.then(function() {
		// redirect to login page
		window.location.href = "/";
	}).catch(function(error) {
		console.log(error);
	});
}