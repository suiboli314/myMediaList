function MyClientModule() {
  const msgDiv = document.querySelector("div#messages");

  function checkForErrors() {
    // https://stackoverflow.com/a/901144/18410211
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.msg);
    if (params.msg) {
      msgDiv.querySelector("#content").innerHTML = params.msg;
      msgDiv.style.dispaly = "blcok";
    }
  }

  async function checkIfLoggedIn() {
    const res = await fetch("/getUser");
    const user = await res.json();

    const spanIsAuth = document.querySelector("span#isAuth");

    if (user.user) {
      spanIsAuth.innerHTML = " Authenticated!";
    } else {
      spanIsAuth.innerHTML = " 😭 ";
    }

    return user.user !== undefined;
  }

  checkForErrors();
  checkIfLoggedIn();
}

MyClientModule();
