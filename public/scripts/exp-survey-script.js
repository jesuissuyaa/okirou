// Initialize Firebase
var config = {
  apiKey: "AIzaSyDRmp_XJqP10QY0oop0Y0u7WalMhDqrhaQ",
  authDomain: "fireba-a8775.firebaseapp.com",
  databaseURL: "https://fireba-a8775.firebaseio.com",
  projectId: "fireba-a8775",
};
firebase.initializeApp(config);

// load footer
loadFooter();

// check sign-in status
firebase.auth().onAuthStateChanged(function(user) {
	// load top nav
	loadTopnav(user);
	if (user) {
		$('#send').click(() => {
			$('.question').css('background-color', '');

			var questions = [];
			var answers = [];

			$('.question').each((index, element) => {
				var next = $(element).next();
				var qnum, ans;
				if (next.is('textarea')) { // textarea
					qnum = next.attr('name');
					ans = next.val();
				} else if (next.is('table')) { // likert
					qnum = next.find('input').attr('name');
					ans = next.find('input:checked').val();

				} else { // radio
					qnum = next.children('input').attr('name');
					var checked = $('input[name="' + qnum + '"]:checked');
					if (checked.val() == "other") { // answer is "other"
						ans = checked.next().val();
						if (!ans) { // text input is empty
							ans = "その他";
						}
					} else { // answer is not "other"
						ans = checked.parent().text();
					}
				}
				// set question # and answer to array
				questions.push(qnum);
				answers.push(ans);
			});

			// set n/a for hidden question
			if (answers["22"] >= 3) {
				answers["23"] = 'n/a';
				console.log('hidden');
			}

			for (var i = 0; i < answers.length; i++) {
				var q = questions[i];
				var a = answers[i];
				console.log(q + ": " + a);
			}
			
			// check for unanswered questions
			var flag = false;
			for (var i = 0; i < answers.length; i++) {
				if (!answers[i]) { // empty answer
					$('.question').eq(i).css('background-color', '#FFCDD2');
					flag = true;
				}
			}

			if (flag) {
				var res = confirm('未入力の項目がありますが、回答を送信しますか？');
				if (res) { // send answer
					$('.question').css('background-color', ''); // do not change bg color
					for (var i = 0; i < answers.length; i++) {
						if (!answers[i])
							answers[i] = 'n/a';
					}
					// store to firebase -> sign out
					storeToDb(user, questions, answers);
				} 
			} else {
				// store to firebase -> sign out
				storeToDb(user, questions, answers);
			}

			/*
			var questions = [];
			var answers = [];

			$('.question').each((index, element) => {
				// add question
				questions.push($(element).text());
				// add answer
				var next = $(element).next();
				if (next.is('textarea')) { // textarea
					answers.push(next.val());

				} else if (next.is('table')) { // likert
					var ans = next.find('input:checked').val();
					answers.push(ans);

				} else { // radio
					var name = next.children('input').attr('name');
					var checked = $('input[name="' + name + '"]:checked');
					var ans;
					if (checked.val() == "other") { // answer is "other"
						ans = checked.next().val();
						if (!ans) { // text input is empty
							ans = "その他";
						}
					} else { // answer is not "other"
						ans = checked.parent().text();
					}
					answers.push(ans);
				}
			});

			// set n/a for hidden question
			if (answers[22] >= 3) {
				answers[23] = 'n/a';
				console.log('hidden');
			}

			// check for unanswered questions
			var flag = false;
			for (var i = 0; i < answers.length; i++) {
				if (!answers[i]) { // empty answer
					$('.question').eq(i).css('background-color', '#FFCDD2');
					flag = true;
				}
			}

			if (flag) {
				var res = confirm('未入力の項目がありますが、回答を送信しますか？');
				if (res) { // send answer
					$('.question').css('background-color', ''); // do not change bg color
					for (var i = 0; i < answers.length; i++) {
						if (!answers[i])
							answers[i] = 'n/a';
					}
					// store to firebase -> sign out
					storeToDb(user, questions, answers);
				} 
			} else {
				// store to firebase -> sign out
				storeToDb(user, questions, answers);
			}
			*/
		})
	} else {
		// redirect to login page
		window.location.href = "/";
	}
})

// toggle question display
$('input[name="q2-3-2"]').change(function() {
	var ans = $(this).val();
	if (ans == "1" || ans == "2") {
		$('.toggle').css('display', 'block');
	} else {
		$('.toggle').css('display', 'none');
	}
})

// select other on text input
$('input[type="text"]').keypress(function() {
	$(this).prev().prop('checked', true);
});

$('input[value="other"]').change(function() {
	if ($(this).is(':checked')) {
		$(this).next().focus();
	}
})

function storeToDb(user, q, a) {
	// add to database
	var ref = firebase.database().ref('exp-survey').push();
	ref.set({'uid': user.uid, 'timestamp': new Date().getTime()})
	.then(() => {
		var promises = [];
		for (var i = 0; i < q.length; i++) {
			var promise = ref.child(q[i]).set(a[i]);
			promises.push(promise);
		}
		return Promise.all(promises);
	}).then(() => {
		console.log('ok');
		alert('回答を送信しました。ご協力ありがとうございました！');
		signOut(user);
	}).catch((error) => {
		console.log(error);
	})
}

/*
$('.question').each((index, element) => {
	// add question
	questions.push($(element).text());
	// add answer
	var next = $(element).next();
	if (next.is('textarea')) { // textarea
		if (!next.val()) { // no answer
			answers.push('n/a');
		} else {
			answers.push(next.val());
		}

	} else if (next.is('table')) { // likert
		var ans = next.find('input:checked').val();
		if (!ans) {
			ans = 'n/a';
		}
		answers.push(ans);

	} else { // radio
		var name = next.children('input').attr('name');
		var checked = $('input[name="' + name + '"]:checked');
		var ans;
		if (!checked.val()) { // no option selected
			ans = "n/a";
		} else if (checked.val() == "other") { // answer is "other"
			ans = checked.next().val();
			if (!ans) { // text input is empty
				ans = "その他";
			}
		} else { // answer is not "other"
			ans = checked.parent().text();
		}
		answers.push(ans);
	}
});
*/