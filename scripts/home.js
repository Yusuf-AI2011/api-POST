const request = new XMLHttpRequest();
const cards = document.querySelector(".home__cards");
const button = document.querySelector(".home__button");
const loading = document.querySelector(".home__loading");

request.addEventListener("readystatechange", () => {
  if (request.readyState === 4) {
    const data = JSON.parse(request.responseText);
    console.log(data);
    show(data);
  }
});
function show(data) {
  const products = data.products;

  products.map((item, index) => {
    button.style.cssText="display: flex;";
    loading.style.cssText="display: none;";
    cards.innerHTML += `
      
        <div class="home__cards cards2">
            <div class="home__card">
                <div class="home__img"><img src=${item.thumbnail} alt="img"></div>
            </div>
            <div class="home__card">
                <h1 class="home__title">Title: + ${item.title}</h1>
            </div>
            <div class="home__card">
                <p class="home__text">Text: + ${item.description}</p>
            </div>
        </div>
      
        `;
  });
}
request.open("GET", "https://dummyjson.com/products");
request.send();

button.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href="index.html";
});
