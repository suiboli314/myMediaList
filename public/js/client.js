function MyClientModule() {
  const msgDiv = document.querySelector("div#messages");

  function checkForLoginErrors() {

    // https://stackoverflow.com/a/901144/18410211
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.msg);
    if (params.msg) {
      msgDiv.querySelector("#content").innerHTML = params.msg;
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
    
    const spanIsAuth = document.querySelector("span#isAuth");

    if (user.user) {
      spanIsAuth.innerHTML = " Authenticated!";
    } else {
      spanIsAuth.innerHTML = " 😭 ";
    }

    return user.user !== undefined;
  }

  checkForLoginErrors();
  checkIfLoggedIn();
}

MyClientModule();
