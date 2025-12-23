const button = document.querySelector(".acc__notsave");

const logout = (e) => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
};

button.addEventListener("click", logout);
