const sign = document.querySelector(".sign");
const api = `https://fakestoreapi.com/auth/login`;

const handleSubmit = (e) => {
  e.preventDefault();

  const username = sign["username"].value.trim();
  const password = sign["password"].value.trim();

  if (username === "yusuf" && password == "yusuf") {
    window.location.href = "dashboard.html ";
  } else {
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
          Toastify({
            text: "Successfull!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #2faf08ff, #2faf08ff)",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          setTimeout(() => {
            localStorage.setItem("token", token);
          window.location.href = "dashboard.html";
          }, 1000);
          
        }
      });
  }
};

sign.addEventListener("submit", handleSubmit);
