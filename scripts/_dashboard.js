const buttonLogout = document.querySelector(".head__button");

buttonLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

let href = window.location.href;
if (href == "http://127.0.0.1:5500/carts.html") {
  document.querySelectorAll(".head__card")[5].style.cssText =
    "box-shadow: 0px 0px 10px 0px #fff;";
} else if (href == "http://127.0.0.1:5500/users.html") {
  document.querySelectorAll(".head__card")[2].style.cssText =
    "box-shadow: 0px 0px 10px 0px #fff;";
} else if (href == "http://127.0.0.1:5500/dashboard.html") {
  document.querySelectorAll(".head__card")[1].style.cssText =
    "box-shadow: 0px 0px 10px 0px #fff;";
}
