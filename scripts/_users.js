const api = "https://fakestoreapi.com/users";
const userCards = document.querySelector(".user__cards");
console.log(userCards);

try {
  const getData = async (url) => {
    const request = await axios.get(url);
    const getFunction = (data) => {
      console.log(data);
      data.map(
        ({ address, email, id, password, name, phone, username }, index) => {
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
                      <p class="user__phone">${phone.replaceAll("-", "")}</p>
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
        }
      );
      for (let i = 0; i < data.length; i++) {
        localStorage.setItem(i, JSON.stringify(data[i].username));
      }
    };
    getFunction(request.data);
  };
  getData(api);
} catch (error) {
  throw new Error(error);
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

  try {
    const postData = (url) => {
      axios.post(url, newUser).then(() => {
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
                      <p class="user__phone">${newUser.phone.replaceAll(
                        "-",
                        ""
                      )}</p>
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
    };
    postData(api);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete user (DELETE)
function deleteFunction(id) {
  try {
    axios.delete(`https://fakestoreapi.com/users/${id}`).then(() => {
      document.querySelectorAll(".user__card")[id].style.cssText =
        "display: none;";
    });
  } catch (error) {
    throw new Error(error);
  }
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
  id = id - 1;

  try {
    const editData = (url) => {
      axios.get(url).then((data) => {
        console.log(data.data[id]);
        editForm["username"].value = data.data[id].username;
        editForm["email"].value = data.data[id].email;
        editForm["phone"].value = data.data[id].phone.replaceAll("-", "");
        editForm["password"].value = data.data[id].password;
        editForm["name"].value = data.data[id].name.firstname;
      });
    };
    editData(api);
  } catch (error) {
    throw new Error(error);
  }

  editSubmit.onclick = (e) => {
    e.preventDefault();
    editWrapper.classList.add("edit__none");

    const username = editForm["username"].value;
    const email = editForm["email"].value;
    const phone = editForm["phone"].value;
    const password = editForm["password"].value;
    const name = editForm["name"].value;

    document.querySelectorAll(".user__username")[id].innerHTML = `${username}`;
    document.querySelectorAll(".user__email")[id].innerHTML = `${email}`;
    document.querySelectorAll(".user__phone")[id].innerHTML = `${phone}`;
    document.querySelectorAll(".user__password")[id].innerHTML = `${password}`;
    document.querySelectorAll(".user__name")[id].innerHTML = `${name}`;

    document.querySelectorAll(".user__username")[id].value = `${username}`;
    document.querySelectorAll(".user__email")[id].value = `${email}`;
    document.querySelectorAll(".user__phone")[id].value = `${phone}`;
    document.querySelectorAll(".user__password")[id].value = `${password}`;
    document.querySelectorAll(".user__name")[id].value = `${name}`;
  };
}

// search part
const searchInput = document.querySelector(".user__search");
searchInput.addEventListener("input", (letter) => {
  if (!(searchInput.value == "")) {
    try {
      const searchData = (url) => {
        axios.get(url).then((data) => {
          console.log(data.data);
          data.data.map((item, index) => {
            // console.log(item.username);
            let spell = item.username.split("");
            // console.log(spell);

            spell.map((item2, index) => {
              if (letter.target.value.toLowerCase() == item2) {
                for (let i = 0; i < data.data.length; i++) {
                  document.querySelectorAll(".user__username")[i].value =
                    JSON.parse(localStorage.getItem(i));
                  let usernameValue =
                    document.querySelectorAll(".user__username")[i];

                  usernameValue.value.split("").map((item, index) => {
                    if (letter.target.value.toLowerCase() == item) {
                      usernameValue.style.cssText = "color: yellow";
                    } else if (searchInput.value == "") {
                      for (let i = 0; i < data.data.length; i++) {
                        usernameValue.style.cssText = "color: #fff";
                      }
                    }
                  });
                }
              }
            });
          });
        });
      };
      searchData(api);
    } catch (error) {
      throw new Error(error);
    }
  }
});
