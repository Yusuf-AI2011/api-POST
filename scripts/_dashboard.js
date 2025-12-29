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

console.log(window.location.href);
