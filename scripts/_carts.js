const api = `https://fakestoreapi.com/carts`;
const cartWrapper = document.querySelector(".cart__down-left");

try {
  const getData = async (url) => {
    const request = await axios.get(url);
    console.log(request.data);

    getFunction(request.data);
    function getFunction(data) {
      data.map(({ id, userId, date }, index) => {
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
  };
  getData(api);
} catch (error) {
  throw new Error(error);
}

// carts delete (DELETE)
function deleteFunction(id) {
  resultWrapper.classList.add("none");

  try {
    axios.delete(`https://fakestoreapi.com/carts/${id}`).then((data) => {
      console.log(id);
      alert("Deleted!");
      document.querySelectorAll(".cart__cards")[id].remove();
    });
  } catch (error) {
    throw new Error(error);
  }
}

const viewButton = document.querySelector(".cart__view");
const resultWrapper = document.querySelector(".cart__result-wrapper");
const resultCard = document.querySelector(".cart__product");

function viewFunction(id) {
  resultWrapper.classList.remove("none");
  resultCard.innerHTML = "";
  let summaPrice = 0;

  try {
    axios.get(`https://fakestoreapi.com/carts/${id}`).then((data) => {
      console.log(data.products);
      let countProduct = data.data.products.length;
      console.log("How many products = " + countProduct);

      data.data.products.map((item, index) => {
        console.log("Which product = " + item.productId);

        try {
          axios
            .get(`https://fakestoreapi.com/products/${item.productId}`)
            .then((data) => {
              console.log(
                "Summarized only product's price: " +
                  data.data.price * item.quantity
              );
              summaPrice += data.data.price * item.quantity;
              console.log("Summarized price of all products: " + summaPrice);
              resultCard.innerHTML += `
              <div class="cart__product-boxes">
                <div class="cart__product-box cart__product-box1">
                  <p class="cart__product-id">Product's id: ${data.data.id}</p>
                  <p class="cart__product-imageWrapper"><img src=${data.data.image} alt="img" class="cart__product-image"></p>
                </div>
                <div class="cart__product-box cart__product-box2">
                  <p class="cart__product-price">Price: ${data.data.price}$</p>
                  <p class="cart__product-quan">Quantity: ${item.quantity}</p>
                  <p class="cart__product-summaPrice">Summarized price: ${summaPrice}$</p>
                  
                  <div class="cart__product-line"></div>
                </div>
              </div>              
              `;
            });
        } catch (error) {
          throw new Error(error);
        }
      });
    });
  } catch (error) {
    throw new Error(error);
  }
}
