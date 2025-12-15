const sign = document.querySelector(".sign");
const api = `https://fakestoreapi.com/auth/login`;

const handleSubmit = (e) => {
  e.preventDefault();

  const username = sign["username"].value.trim();
  const password = sign["password"].value.trim();

  const user = {
    username,
    password,
  };

  // fetch request
  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      const token = data.token;

      if (token) {
        alert("successfull!");
        localStorage.setItem("token", token);
        window.location.href="account.html";
      }
    });
};

sign.addEventListener("submit", handleSubmit);
