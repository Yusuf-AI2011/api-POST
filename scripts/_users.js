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
  console.log(data);
  data.map(({ address, email, id, password, name, phone, username }, index) => {
    userCards.innerHTML += `
        <div class="user__card">
                  <p class="user__username">${username}</p>
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
                  </div>
        `;
  });
}
