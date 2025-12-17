const request = new XMLHttpRequest();
const wrapper = document.querySelector(".an__table-body");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4) {
    const data = JSON.parse(request.responseText);
    console.log(data);
    show(data);
  }
});
function show(data) {
  data.map((item, index) => {
    wrapper.innerHTML += `
            <tr class="an__table-row">
              <td class="an__table-description">${item.id}</td>
              <td class="an__table-description">${item.title}</td>
              <td class="an__table-description">${item.category}</td>
              <td class="an__table-description">${item.description}</td>
              <td class="an__table-description">${item.price}$</td>
              <td class="an__table-description"><img class="an__image" src=${item.image} alt="img"></td>
              <td class="an__table-description">${item.action}</td>
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
  Window.location.href = "index.html";
});

buttonAn.addEventListener("click", () => {
  document.querySelector(".an__wrapper").style.cssText = "display: flex;";
  document.querySelector(".products__wrapper").style.cssText = "display: none;";
});

buttonPro.addEventListener("click", () => {
  document.querySelector(".an__wrapper").style.cssText = "display: none;";
  document.querySelector(".products__wrapper").style.cssText = "display: flex;";
});
