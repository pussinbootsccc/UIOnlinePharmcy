var checkIsLoggedIn_login;

$(document).ready(function () {
    $("div.submit").click(function() {
        if(typeof(Storage) !== "undefined") {
            sessionStorage.isLoggedin = "yes";
            checkIsLoggedIn_login();
        } else {
            alert("Sorry! No Web Storage support...")
        }
    });

    $("#logout").click(function() {
        if(typeof(Storage) !== "undefined") {
            sessionStorage.isLoggedin = "no";
            checkIsLoggedIn_login();
        } else {
            alert("Sorry! No Web Storage support...")
        }
    });
    
    checkIsLoggedIn_login = function() {
      var account = $("nav.private ul");
      var login = account.children().slice(3, 5);
      var signup = account.children().slice(5, 7);
      var logout = account.children().slice(7, 9);

      var welcome = $("div.welcome");
      var welcome_out = welcome.children().eq(0);
      var welcome_in = welcome.children().eq(1);

      return function() {
        if (sessionStorage.isLoggedin === "yes") {
          welcome_in.show();
          welcome_out.hide();

          login.hide();
          signup.hide();
          logout.show();
        } else { // not logged in
          welcome_in.hide();
          welcome_out.show();

          logout.hide();
          login.show();
          signup.show();
        }
      }
    }();

    checkIsLoggedIn_login();

    var pathname = window.location.pathname;
    var path = pathname.substr(pathname.lastIndexOf('/') + 1);

    if (path !== "login.html") {
        sessionStorage.referer = path;
    } else {
        if (sessionStorage.getItem("referer") !== null) {
            $("form.registed").attr("action", sessionStorage.referer);
        }
    }

    $("form.search").attr("action", "searchresult_grid.html");
});
