Socket = io();
const login_form = document.getElementById("login_form");

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userLogin = Object.fromEntries(new FormData(e.target));
  e.target.reset();
  fetch("http://localhost:8080/api/sessions/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userLogin),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Hubo un error al procesar la solicitud");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("dataUser", JSON.stringify(data));
      window.location.href = "/products";
    });
});
