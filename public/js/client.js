function MyClientModule() {
  const msgDiv = document.getElementById("messages");
  const spanIsAuth = document.getElementById("isAuth");
  const signinPanel = document.getElementById("signin-section");
  const authMessage = document.getElementById("authMessage");

  function checkIfSignError() {
    const urlParams = new URLSearchParams(window.location.search);
    // https://stackoverflow.com/a/901144/18410211
    const params = new Proxy(urlParams, {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.auth);

    if (params.auth !== null) {
      msgDiv.style.display = "block";

      if (params.auth === "true") {
        authMessage.innerHTML = "authenticated";
        msgDiv.classList.add("alert-success");
      } else if (params.auth === "false") {
        authMessage.innerHTML = "error authenticating";
        msgDiv.classList.add("alert-danger");
      }
    }
  }

  async function checkIfLoggedIn() {
    console.log("check if logged in");
    const res = await fetch("/getUser");
    const user = await res.json();
    console.log(user);

    if (user.user) {
      spanIsAuth.innerHTML =
        user.user +
        "  " +
        // add sign out button
        `<button id="signout" class="btn btn-link" type="button">Log Out</button>`;
      signinPanel.hidden = true;

      // add sign out button functionality
      const signoutbtn = document.getElementById("signout");
      signoutbtn.onclick = await function () {
        signout();
      };
      checkIfSignError();
    } else {
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
      checkIfSignError();
    }

    async function signout() {
      await fetch("/signout");
      console.log("log out");
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
    }

    return user.user !== undefined;
  }

  function toggleSignInUp() {
    const btn_signin = document.getElementById("signup_back");
    const btn_signup = document.getElementById("signup");
    const form_signin = document.getElementById("signin_form");
    const form_signup = document.getElementById("signup_form");

    btn_signin.onclick = () => toggle(false, form_signin, form_signup);
    btn_signup.onclick = () => toggle(true, form_signin, form_signup);
    
  }

  function toggle(bool, form1, form2) {
    form1.hidden = bool;
    form2.hidden = !bool;
  }

  checkIfLoggedIn();
  toggleSignInUp();
}

MyClientModule();
