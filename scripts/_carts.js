const request = new XMLHttpRequest();
const cartWrapper = document.querySelector(".cart__down-left");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4) {
    const data = JSON.parse(request.responseText);
    getFunction(data);
  }
});
function getFunction(data) {
  // console.log(data);

  data.map(({ id, userId, date, product }, index) => {
    cartWrapper.innerHTML += `
    
            <div class="cart__cards">
                <div class="cart__card">
                  <p class="cart__id">${id}</p>
                </div>
                <div class="cart__card">
                  <p class="cart__userid">${userId}</p>
                </div>
                <div class="cart__card">
                  <p class="cart__date">${date}</p>
                </div>
                <div class="cart__card">
                    <div class="cart__buttons">
                        <button onclick = "viewFunction(${id})" class="cart__view cart__button">View</button>
                        <button onclick = "deleteFunction(${id})" class="cart__delete cart__button">Delete</button>
                    </div>
                </div>
              </div>

    `;
  });
}
request.open("GET", "https://fakestoreapi.com/carts");
request.send();

// carts delete (DELETE)
function deleteFunction(id) {
  resultWrapper.classList.add("none");
  fetch(`https://fakestoreapi.com/carts/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(id);
      alert("Deleted!")
      document.querySelectorAll(".cart__cards")[id].remove();
    });
}

const viewButton = document.querySelector(".cart__view");
const resultWrapper = document.querySelector(".cart__result-wrapper");
const resultCard = document.querySelector(".cart__product");

function viewFunction(id) {
  resultWrapper.classList.remove("none");
  resultCard.innerHTML = "";
  let summaPrice = 0;
  fetch(`https://fakestoreapi.com/carts/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      console.log(data.products);
      let countProduct = data.products.length;
      console.log("How many products = " + countProduct);

      data.products.map((item, index) => {
        console.log("Which product = " + item.productId);

        fetch(`https://fakestoreapi.com/products/${item.productId}`)
          .then((resGetProducts) => resGetProducts.json())
          .then((data) => {
            console.log(
              "Summarized only product's price: " + data.price * item.quantity
            );
            summaPrice += data.price * item.quantity;
            console.log("Summarized price of all products: " + summaPrice);
            resultCard.innerHTML += `
              <div class="cart__product-boxes">
                <div class="cart__product-box cart__product-box1">
                  <p class="cart__product-id">Product's id: ${data.id}</p>
                  <p class="cart__product-imageWrapper"><img src=${data.image} alt="img" class="cart__product-image"></p>
                </div>
                <div class="cart__product-box cart__product-box2">
                  <p class="cart__product-price">Price: ${data.price}$</p>
                  <p class="cart__product-quan">Quantity: ${item.quantity}</p>
                  <p class="cart__product-summaPrice">Summarized price: ${summaPrice}$</p>
                  
                  <div class="cart__product-line"></div>
                </div>
              </div>              
              `;
          });
      });
    });
    
}
