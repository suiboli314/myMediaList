function MyClientModule() {
  const msgDiv = document.getElementById("messages");
  const spanIsAuth = document.getElementById("isAuth");
  const signinPanel = document.getElementById("signin-section");
  const authMessage = document.getElementById("authMessage");
  const btn_signin = document.getElementById("signup_back");
  const btn_signup = document.getElementById("signup");
  const btn_resetBack = document.getElementById("resetPass_back");
  const form_signin = document.getElementById("signin_form");
  const form_signup = document.getElementById("signup_form");
  const form_reset = document.getElementById("reset_form");

  function checkIfSignError() {
    const urlParams = new URLSearchParams(window.location.search);
    // https://stackoverflow.com/a/901144/18410211
    const params = new Proxy(urlParams, {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.auth !== null) {
      console.log("urlParams auth:%s", params.auth);
      msgDiv.style.display = "block";

      if (params.auth === "true") {
        authMessage.innerHTML = "authenticated";
        msgDiv.classList.add("alert-success");
      } else if (params.auth === "false") {
        authMessage.innerHTML = "error authenticating";
        msgDiv.classList.add("alert-danger");
      }
    }

    if (params.signup !== null) {
      msgDiv.style.display = "block";
      if (params.signup === "true") {
        authMessage.innerHTML = "sign up succeed";
        msgDiv.classList.add("alert-success");
      } else if (params.signup === "false") {
        authMessage.innerHTML = "sign up failed";
        msgDiv.classList.add("alert-danger");
        btn_signup.click();
      }
    }

    if (params.reset !== null) {
      msgDiv.style.display = "block";
      if (params.reset === "true") {
        authMessage.innerHTML = "reset password succeed";
        msgDiv.classList.add("alert-success");
        toggleHidden(false, form_signin, form_reset);
        signinPanel.hidden = true;
      } else if (params.reset === "false") {
        authMessage.innerHTML = "reset password failed";
        msgDiv.classList.add("alert-danger");
        toggleHidden(true, form_signin, form_reset);
        signinPanel.hidden = false;
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
        `<button id="btn_signout" class="btn btn-link" type="button">Log Out</button>` +
        ",  " +
        // add reset password button
        "" +
        `<button id="btn_reset" class="btn btn-link" type="button">Reset</button>` +
        "password,  " +
        // add delete user button
        `<button id="btn_deleteThisUser" class="btn btn-link" type="button">Delete</button>` +
        "this user";
      signinPanel.hidden = true;

      // add sign out button functionality
      const btn_signout = document.getElementById("btn_signout");
      btn_signout.onclick = async () => {
        await signout();
      };

      // add delete user button functionality
      const btn_resetPass = document.getElementById("btn_reset");
      btn_resetPass.onclick = () => resetPassword();

      // add delete user button functionality
      const btn_deleteUser = document.getElementById("btn_deleteThisUser");
      btn_deleteUser.onclick = async () => {
        await deleteThisUser();
      };

      checkIfSignError();
    } else {
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
      checkIfSignError();
    }

    async function deleteThisUser() {
      await fetch("/deleteThisUser");
      console.log("delete this user");
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
    }

    async function signout() {
      await fetch("/signout");
      console.log("log out");
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
    }

    function resetPassword() {
      console.log("log out");
      signinPanel.hidden = false;
      toggleHidden(true, form_signin, form_reset);
    }

    return user.user !== undefined;
  }

  function toggleFormEvent() {
    btn_signin.onclick = () => toggleHidden(false, form_signin, form_signup);
    btn_signup.onclick = () => toggleHidden(true, form_signin, form_signup);
    btn_resetBack.onclick = () => {
      toggleHidden(false, form_signin, form_reset);
      signinPanel.hidden = true;
    };
  }

  function toggleHidden(bool, form1, form2) {
    form1.hidden = bool;
    form2.hidden = !bool;
  }

  checkIfLoggedIn();
  toggleFormEvent();
}

MyClientModule();
