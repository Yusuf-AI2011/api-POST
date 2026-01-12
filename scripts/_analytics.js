const api = `https://fakestoreapi.com/products`;
const tableBody = document.querySelector(".an__table-body");
try {
  const getData = async (url) => {
    const request = await axios.get(url);

    const getFunction = (data) => {
      data.map(({ id, title, category, price, image }, index) => {
        tableBody.innerHTML += `
        <tr class="an__table-row">
  <td class="an__table-description an__table-id">${id}</td>
  <td class="an__table-description an__table-title">${title}</td>
  <td class="an__table-description an__table-category">${category}</td>

  <td class="an__table-description an__table-price">${price}$</td>
  <td class="an__table-description an__table-image"><img class="an__image" src=${image} alt="img"></td>
  <td class="an__table-description">
    <div class="an__table-buttons">
      <button class="an__table-button an__table-edit" onclick = "editFunction(${id})">Edit</button>
      <button class="an__table-button an__table-delete" onclick = "deleteFunction(${id})">Delete</button>
    </div>
  </td>
</tr>
        `;
      });
    };
    getFunction(request.data);
  };
  getData(api);
} catch (error) {
  throw new Error(error);
}

// add modal window (PRODUCTS)
const addButton = document.querySelector(".add-closer");
const addProduct = document.querySelector(".add__wrapper");
const addCancel = document.querySelector(".add-cancel");
const addSubmit = document.querySelector(".add-submit");
const addForm = document.querySelector(".add-form");

addButton.addEventListener("click", () => {
  addProduct.classList.remove("none");
});

addCancel.addEventListener("click", () => {
  addProduct.classList.add("none");
});

// POST new product
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

  try {
    const postFunction = (url) => {
      axios.post(url, product).then((data) => {
        console.log(data.data);

        tableBody.innerHTML += `
        <tr class="an__table-row">
  <td class="an__table-description an__table-id">${data.data.id}</td>
  <td class="an__table-description an__table-title">${data.data.title}</td>
  <td class="an__table-description an__table-category">${data.data.category}</td>

  <td class="an__table-description an__table-price">${data.data.price}$</td>
  <td class="an__table-description an__table-image"><img class="an__image" src=${data.data.image} alt="img"></td>
  <td class="an__table-description">
    <div class="an__table-buttons">
      <button class="an__table-button an__table-edit" onclick = "editFunction()">Edit</button>
      <button class="an__table-button an__table-delete" onclick = "deleteFunction()">Delete</button>
    </div>
  </td>
</tr>
        `;
      });
    };
    postFunction(api);
  } catch (error) {
    throw new Error(error);
  }
  addProduct.classList.add("none");
});

// api delete

const buttonDelete = document.querySelector(".an__table-delete");

function deleteFunction(id) {
  try {
    const deleteData = (url) => {
      axios.delete(`https://fakestoreapi.com/products/${id}`).then((data) => {
        if (data) {
          document.querySelectorAll(".an__table-row")[id - 1].style.cssText =
            "display: none;";
        }
      });
    };
    deleteData(api);
  } catch (error) {
    throw new Error(error);
  }
}

// PUT modal window

const edit = document.querySelector(".edit__wrapper");
const editForm = document.querySelector(".edit__form");
const editButton = document.querySelector(".an__table-edit");
const editCancel = document.querySelector(".edit__cancel");
const editSubmit = document.querySelector(".edit__submit");

editCancel.addEventListener("click", () => {
  edit.classList.add("edit__none");
});

function editFunction(id) {
  edit.classList.remove("edit__none");
  console.log("ID = " + id);

  try {
    const editData = (url) => {
      axios.get(`https://fakestoreapi.com/products/${id}`).then((data) => {
        editForm["title"].value = data.data.title;
        editForm["category"].value = data.data.category;
        editForm["price"].value = data.data.price;
        editForm["image"].value = data.data.image;

        editSubmit.onclick = (e) => {
          e.preventDefault();
          const productsForPut = {
            title: editForm["title"].value,
            category: editForm["category"].value,
            price: editForm["price"].value,
            image: editForm["image"].value,
          };

          const tableTitle = document.querySelectorAll(".an__table-title");
          const tableCategory = document.querySelectorAll(
            ".an__table-category"
          );
          const tablePrice = document.querySelectorAll(".an__table-price");
          const tableImage = document.querySelectorAll(".an__table-image");

          tableTitle[id - 1].innerHTML = productsForPut.title;
          tableCategory[id - 1].innerHTML = productsForPut.category;
          tablePrice[id - 1].innerHTML = productsForPut.price;
          tableImage[id - 1].innerHTML = productsForPut.image;

          edit.classList.toggle("edit__none");
        };
      });
    };
    editData(api);
  } catch (error) {
    throw new Error(error);
  }
}
