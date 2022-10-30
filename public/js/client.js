function MyClientModule() {
  const msgDiv = document.getElementById("messages");
  const spanIsAuth = document.getElementById("isAuth");
  const signinPanel = document.getElementById("signin-section");
  let signoutbtn;

  function checkIfSigninError() {
    // https://stackoverflow.com/a/901144/18410211
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.msg);
    if (params.msg) {
      msgDiv.querySelector("#userName").innerHTML = params.msg;
      msgDiv.style.display = "block";
      if (params.msg === "authenticated") msgDiv.classList.add("alert-success");
      else msgDiv.classList.add("alert-danger");
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
        `<button id="signout" class="btn btn-link" type="button">Log Out</button>`;
      signinPanel.hidden = true;
      signoutbtn = document.getElementById("signout");
      signoutbtn.onclick = await function () {
        signout();
      };
    } else {
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
      checkIfSigninError();
    }

    async function signout() {
      await fetch("/signout");
      console.log("log out");
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
    }

    return user.user !== undefined;
  }

  const btn_signup = document.getElementById("signup");
  btn_signup.onclick = () => {};

  checkIfLoggedIn();
}

MyClientModule();
