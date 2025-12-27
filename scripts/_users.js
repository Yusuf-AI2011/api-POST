const request = new XMLHttpRequest();
const userCards = document.querySelector(".user__cards");

request.addEventListener("readystatechange", () => {
  //   console.log(request.readyState);
  if (request.readyState === 4) {
    const data = JSON.parse(request.responseText);
    getFunction(data);
  }
});
request.open("GET", "https://fakestoreapi.com/users");
request.send();

function getFunction(data) {
  // console.log(data);
  data.map(({ address, email, id, password, name, phone, username }, index) => {
    userCards.innerHTML += `
        <div class="user__card">
                  <div class="user__box">
                    <p class="user__username">${username}</p>
                  </div>
                  <div class="user__boxes">
                    <div class="user__box">
                      <p class="user__email">${email}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__phone">${phone}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__password">${password}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__name">${name.firstname}</p>
                    </div>
                    <div class="user__box">
                      <div class="user__buttons">
                        <button onclick = editFunction(${id}) class="user__button user__edit">Edit</button>
                        <button onclick = deleteFunction(${id})  class="user__button user__delete ">Delete</button>
                    </div>
                  </div>
                  </div>
        `;
  });
}

// Add new user (POST)
const addButton = document.querySelector(".user__add-button");
const cancelButton = document.querySelector(".modal__cancel");
const submitButton = document.querySelector(".modal__submit");
const modalForm = document.querySelector(".modal__form");
const modalWrapper = document.querySelector(".modal__wrapper");
addButton.addEventListener("click", () => {
  modalWrapper.classList.remove("none");
});
cancelButton.addEventListener("click", () => {
  modalWrapper.classList.add("none");
});
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = modalForm["username"].value.trim();
  const email = modalForm["email"].value.trim();
  const phone = modalForm["phone"].value.trim();
  const password = modalForm["password"].value.trim();
  const name = modalForm["name"].value.trim();

  const newUser = {
    username,
    email,
    phone,
    password,
    name,
  };
  fetch(`https://fakestoreapi.com/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => {
      if (
        !(
          newUser.username &&
          newUser.email &&
          newUser.phone &&
          newUser.password &&
          newUser.name
        )
      ) {
        Toastify({
          text: "Fill all them!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#ff0000ff",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      } else {
        modalWrapper.classList.add("none");
        userCards.innerHTML += `
        <div class="user__card">
                  <div class="user__box">
                    <p class="user__username">${newUser.username}</p>
                  </div>                  
                  <div class="user__boxes">
                    <div class="user__box">
                      <p class="user__email">${newUser.email}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__phone">${newUser.phone}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__password">${newUser.password}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__name">${newUser.name}</p>
                    </div>
                    <div class="user__box">
                      <div class="user__buttons">
                        <button class="user__button user__edit">Edit</button>
                        <button class="user__button user__delete ">Delete</button>
                    </div>
                  </div>
        `;
      }
    });
});

// Delete user (DELETE)
function deleteFunction(id) {
  fetch(`https://fakestoreapi.com/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll(".user__card")[id].style.cssText =
        "display: none;";
    });
}

// Edit user (PUT)
const editWrapper = document.querySelector(".edit__Wrapper");
const editForm = document.querySelector(".edit__form");
const editCancel = document.querySelector(".edit__cancel");
const editSubmit = document.querySelector(".edit__submit");

editCancel.addEventListener("click", () => {
  editWrapper.classList.add("edit__none");
});

function editFunction(id) {
  editWrapper.classList.remove("edit__none");

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      console.log(data[id - 1]);

      const which = id - 1;
      // console.log(data[id - 1]);
      editForm["username"].value = data[id - 1].username;
      editForm["email"].value = data[id - 1].email;
      editForm["phone"].value = data[id - 1].phone.replaceAll("-", "");
      editForm["password"].value = data[id - 1].password;
      editForm["name"].value = data[id - 1].name.firstname;

      const username = editForm["username"].value;
      const email = editForm["email"].value;
      const phone = editForm["phone"].value;
      const password = editForm["password"].value;
      const name = editForm["name"].value;

      const editUser = {
        username,
        email,
        phone,
        password,
        name,
      };

      fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      })
        .then((res) => res.json())
        .then((data) => {
          editSubmit.addEventListener("click", () => {
            editWrapper.classList.add("edit__none");

            console.log(editForm["username"].value);
            console.log(
              document.querySelectorAll(".user__username")[which].value
            );

            const userCards = document.querySelectorAll(".user__cards")[id - 1];

            userCards.innerHTML += `
        <div class="user__card">
                  <div class="user__box">
                    <p class="user__username">${editForm["username"].value}</p>
                  </div>                  
                  <div class="user__boxes">
                    <div class="user__box">
                      <p class="user__email">${newUser.email}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__phone">${newUser.phone}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__password">${newUser.password}</p>
                    </div>
                    <div class="user__box">
                      <p class="user__name">${newUser.name}</p>
                    </div>
                    <div class="user__box">
                      <div class="user__buttons">
                        <button class="user__button user__edit">Edit</button>
                        <button class="user__button user__delete ">Delete</button>
                    </div>
                  </div>
        `;
          });
        });
    }
  });
  request.open("GET", `https://fakestoreapi.com/users`);
  request.send();
  userCards.innerHTML = "";
}
