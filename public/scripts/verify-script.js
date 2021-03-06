// Initialize Firebase
var config = {
  apiKey: "AIzaSyDRmp_XJqP10QY0oop0Y0u7WalMhDqrhaQ",
  authDomain: "fireba-a8775.firebaseapp.com",
  databaseURL: "https://fireba-a8775.firebaseio.com",
  projectId: "fireba-a8775"
};
firebase.initializeApp(config);

// load top nav
loadTopnav(null);
// load footer
loadFooter();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // log on disconnection
    $(window).on('beforeunload', function() {
      // log
      logUserAction(user, 'verify-out');
      return undefined;
    })    

    $('#send').click(function() {
      // send verification email
      user.sendEmailVerification().then(function() {
        alert('アカウント認証メールを送信しました');
      })
    });
  } else {
    // redirect to top page
    window.location.href = "/";
  }
})