let go_sign_up = document.querySelector(".signUp");
let go_login = document.querySelector(".Login");

let sign_up = document.querySelector(".sign_up");
let login = document.querySelector(".login");

let Fname = document.querySelector(".Fname");
let Lname = document.querySelector(".Lname");
let eemail = document.querySelector(".email");
let ppassword = document.querySelector(".pass");
let aage = document.querySelector(".age");
let ccontact = document.querySelector(".contact");

let activeName = document.querySelector("#activeUser");
let logout = document.querySelector("#remove");

go_sign_up?.addEventListener("click", () => {
  // window.location = "http://127.0.0.1:5500/";
  window.location.href = "sign_up.html";
});

go_login?.addEventListener("click", function () {
  // window.location = "http://127.0.0.1:5500/login.html";
  window.location.href = "login.html";
});

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveData(e) {
  let fFname = Fname.value;
  let lLname = Lname.value;
  let eeemail = eemail.value;
  let pppassword = ppassword.value;

  let aaage = aage.value;
  let cccontact = ccontact.value;

  if (!eeemail || !pppassword || !fFname || !lLname) {
    alert("Please Fill All Required Fields");
    return false;
  } else {
    users.push({
      email: eeemail,
      password: pppassword,
      FirstName: fFname,
      LastName: lLname,
      age: aaage,
      contact: cccontact,
      todos: [],
    });

    localStorage.setItem("users", JSON.stringify(users));

    // toast

    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });

    toastList.forEach((toast) => toast.show());
    document.querySelector("form").reset();
  }
  e.preventDefault();
}
function getData(e) {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));
  let activeUser = users.find((u) => u.email === eemail.value);

  // console.log(activeUser.todos[0]);

  if (activeUser) {
    if (activeUser.password === ppassword.value) {
      // alert("login"); //2
      localStorage.setItem("activeUser", JSON.stringify(activeUser)); //3
      setTimeout(function () {
        window.location.href = "dashboard.html";
      });
    } else {
      alert("Wrong email or password");
    }
  } else {
    alert("User deos not exist.");
  }
}
sign_up?.addEventListener("click", saveData);
login?.addEventListener("click", getData);
