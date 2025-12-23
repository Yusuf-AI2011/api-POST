const request = new XMLHttpRequest();
const wrapper = document.querySelector(".an__table-body");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4) {
    const data = JSON.parse(request.responseText);
    // console.log(data);
    show(data);
  }
});
function show(data) {
  data.map(({ id, title, category, price, image }, index) => {
    wrapper.innerHTML += `
            <tr class="an__table-row">
              <td class="an__table-description an__table-id">${id}</td>
              <td class="an__table-description">${title}</td>
              <td class="an__table-description">${category}</td>
             
              <td class="an__table-description">${price}$</td>
              <td class="an__table-description"><img class="an__image" src=${image} alt="img"></td>
              <td class="an__table-description">
                <div class="an__table-buttons">
                  <button class="an__table-button an__table-edit">Edit</button>
                  <button class="an__table-button an__table-delete" onclick = "deleteFunction(${id})">Delete</button>
                </div>
              </td>
            </tr>
        `;
  });
}
request.open("GET", "https://fakestoreapi.com/products");
request.send();

const buttonAn = document.querySelector(".head__buttonAn");
const buttonPro = document.querySelector(".head__buttonPro");
const buttonLogout = document.querySelector(".head__button");

buttonLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

buttonAn.addEventListener("click", () => {
  // e.preventDefault();
  document.querySelector(".an__wrapper").style.cssText = "display: flex;";
  document.querySelector(".products__wrapper").style.cssText = "display: none;";
});

buttonPro.addEventListener("click", () => {
  // e.preventDefault();
  document.querySelector(".an__wrapper").style.cssText = "display: none;";
  document.querySelector(".products__wrapper").style.cssText = "display: flex;";
});

// api delete

const buttonDelete = document.querySelector(".an__table-delete");

function deleteFunction(id) {
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        document.querySelector(".an__table-description").parentElement.remove();
      }
    });
}

// add modal window (PRODUCTS)
const addButton = document.querySelector(".add-closer");
const addProduct = document.querySelector(".add-product");
const addCancel = document.querySelector(".add-cancel");
const addSubmit = document.querySelector(".add-submit");
const addForm = document.querySelector(".add-form");

addButton.addEventListener("click", () => {
  // e.preventDefault();
  addProduct.classList.toggle("none");
});

addCancel.addEventListener("click", () => {
  // e.preventDefault();
  addProduct.classList.toggle("none");
});

addSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const title = addForm["title"].value.trim();
  const category = addForm["category"].value.trim();
  const price = addForm["price"].value.trim();
  const image = addForm["image"].value.trim();

  const product = {
    title,
    category,
    price,
    image,
  };

  // POST new product
  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!(data.id && data.title && data.category && data.image)) {
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
            background: "linear-gradient(to right, rgba(255, 0, 0, 1))",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      } else {
        wrapper.innerHTML += `
            <tr class="an__table-row">
              <td class="an__table-description an__table-id">${data.id}</td>
              <td class="an__table-description">${data.title}</td>
              <td class="an__table-description">${data.category}</td>
             
              <td class="an__table-description">${data.price}$</td>
              <td class="an__table-description"><img class="an__image" src=${data.image} alt="img"></td>
              <td class="an__table-description">
                <div class="an__table-buttons">
                  <button class="an__table-button an__table-edit">Edit</button>
                  <button class="an__table-button an__table-delete" onclick = "deleteFunction()">Delete</button>
                </div>
              </td>
            </tr>
        `;
      }
    });
});
