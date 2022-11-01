function MyClientModule() {
  const msgDiv = document.getElementById("messages");
  const spanIsAuth = document.getElementById("isAuth");
  const signinPanel = document.getElementById("signin-section");
  const authMessage = document.getElementById("authMessage");
  const btn_signin = document.getElementById("signup_back");
  const btn_signup = document.getElementById("signup");
  const btn_resetBack = document.getElementById("resetPass_back");
  const select_title = document.getElementById("select_title");
  const form_signin = document.getElementById("signin_form");
  const form_signup = document.getElementById("signup_form");
  const form_reset = document.getElementById("reset_form");
  const media_list = document.getElementById("media_list");

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
        signinPanel.hidden = false;
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
      btn_signout.onclick = signout;

      // add delete user button functionality
      const btn_resetPass = document.getElementById("btn_reset");
      btn_resetPass.onclick = resetPassword;

      // add delete user button functionality
      const btn_deleteUser = document.getElementById("btn_deleteThisUser");
      btn_deleteUser.onclick = deleteThisUser;

      checkIfSignError();
      fetchTitles();
      fetchReviews(user);
    } else {
      spanIsAuth.innerHTML = " 😭 ";
      signinPanel.hidden = false;
      checkIfSignError();
    }

    async function deleteThisUser() {
      await fetch("/deleteThisUser");
      console.log("delete this user");
      spanIsAuth.innerHTML = " 😭 ";
      media_list.innerHTML = `<option value="">Please Choose</option>`;
      signinPanel.hidden = false;
    }

    async function signout() {
      await fetch("/signout");
      console.log("log out");
      spanIsAuth.innerHTML = " 😭 ";
      media_list.innerHTML = "";
      media_list.innerHTML = `<option value="">Please Choose</option>`;
      select_title.innerHTML = signinPanel.hidden = false;
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

  async function fetchReviews(user) {
    const res = await fetch("/media/fetchReviews");
    const reviews = await res.json();
    console.log("reviews" + reviews);
    reviews.forEach((element) => {
      media_list.innerHTML += `
                  <div
                    data-id="${element._id}"
                    class="inventory-item d-block d-md-flex podcast-entry bg-white mb-5"
                    data-aos="fade-up"
                  >
                    <!-- <img class="image" src="/works?url=${
                      element.imageUrl
                    }" hidden/> -->
                    <div class="text">
                      <div>
                        <h3 style="display: inline" class="font-weight-light">
                          <a>${element.title}</a>
                        </h3>
                        <span style="margin-left: 30px">
                          <!-- <a href="/authorRelated?author=${
                            element.author
                          }"> -->
                            ${element.author}
                          <!-- </a> -->
                        </span>
                      </div>
                      <div class="mb-3">
                        <span class="text-black-opacity-55">
                          <small> ${
                            element.reviews.find(
                              (item) => item.user == user.user
                            ).review
                          } 
                          </small>
                        </span>
                      </div>
                      <!-- <div class="text-white mb-3" style="text-align: right">
                        <span class="text-black-opacity-05">
                          <small>
                            <span class="sep"></span>
                            ${element.createDate}
                            <span class="sep">|</span>one day
                          </small>
                        </span>
                      </div> -->
                    </div>
                  </div>`;
    });
  }

  async function fetchTitles() {
    const res = await fetch("/media/titles");
    const media = await res.json();
    // console.log(media);
    select_title.innerHTML = "";
    media.forEach((element) => {
      select_title.innerHTML += `<option value="${element.title}" author="${element.author}" imageUrl="${element.imageUrl}">${element.title}</option>`;
    });

    const author = document.getElementById("author");
    const cover = document.getElementById("cover");

    select_title.onchange = () => {
      author.value =
        select_title.options[
          select_title.selectedIndex
        ].attributes.author.value;
    };
  }

  checkIfLoggedIn();
  toggleFormEvent();
}

MyClientModule();
