document.querySelector("#use").innerHTML = JSON.parse(
  localStorage.getItem("activeUser")
).FirstName;

function myFun() {
  localStorage.removeItem("activeUser");
  //  document.querySelector('#activeUser').innerHTML="da";
  window.location.href = "login.html";
}

document
  .querySelector(".add_description")
  .addEventListener("click", function () {
    let todo_des = document.querySelector(".description").value;

    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    activeUser.todos.push({
      description: todo_des,
      completed: false,
    });

    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    let users = JSON.parse(localStorage.getItem("users"));

    // users.filter((item) => {
    //   if(activeUser.email === item.email){
    //     // users.push(activeUser)

    //     // users.todos=todo_des;
    //   }
    // })
    //   console.log(users);

    // users.map(obj => obj.activeUser || obj);
    // //  let activeUserobj= users.find((u) => u.email === eemail.value);
    // //  console.log(users)

    users.forEach((element) => {
      //  debugger;
      if (element.email === activeUser.email) {
        //  console.log(users[index],'test',element.email === activeUser.email)
        element.todos.push({
          description: todo_des,
          completed: false,
        });
      }
    });

    localStorage.setItem("users", JSON.stringify(users));
    addTask();
    document.querySelector("form").reset();
  });

window.onload = loadTasks;
function loadTasks() {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let todos_item = activeUser.todos;

  todos_item.forEach((task, index) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="check" onclick="taskComplete(this)">
        
          <input type="text" value="${task.description}" class="edited" onfocus="getCurrentTask(this)" >
           <ion-icon name="create-outline" class="edit" onclick ="editTask(this)"></ion-icon>
         <ion-icon class="del" name="trash-outline" onclick="removeTask(this)"></ion-icon>`;
    //  debugger;
    list.insertBefore(li, list.children[0]);
  });
}
function addTask() {
  let des = document.querySelector(".description").value;

  const list = document.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" class="check" onclick="taskComplete(this)">
          <input type="text" value=${JSON.stringify(
            des
          )} class="edited" onfocus="getCurrentTask(this)" >
          <ion-icon name="create-outline" class="edit" onclick ="editTask(this)"></ion-icon>
         <ion-icon class="del" name="trash-outline"  onclick="removeTask(this)"></ion-icon>`;
  //  debugger;
  list.insertBefore(li, list.children[0]);
}

let currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}
function editTask(event) {
  let edit_des = event.previousElementSibling.value;

  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let todos_item = activeUser.todos;

  todos_item.forEach((task) => {
    if (task.description === currentTask) {
      task.description = edit_des;
    }
  });

  localStorage.setItem("activeUser", JSON.stringify(activeUser));

  let users = JSON.parse(localStorage.getItem("users"));
  // for users edit description
  users.forEach((element) => {
    if (element.email === activeUser.email) {
      let items = element.todos;

      items.forEach((task) => {
        if (task.description === currentTask) {
          task.description = edit_des;
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  });
}

function removeTask(event) {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let todos_item = activeUser.todos;

  todos_item.forEach((task) => {
    if (task.description === event.parentNode.children[1].value) {
      // delete task
      todos_item.splice(todos_item.indexOf(task), 1);

      localStorage.setItem("activeUser", JSON.stringify(activeUser));
    }
  });
  //  localStorage.setItem("users", JSON.stringify(users));
  event.parentElement.remove();

  let users = JSON.parse(localStorage.getItem("users"));
  // let todos_items = users.todos;

  users.forEach((element) => {
    //  debugger;
    if (element.email === activeUser.email) {
      let items = element.todos;
      items.forEach((task) => {
        if (task.description === event.parentNode.children[1].value) {
          // delete task
          items.splice(todos_item.indexOf(task), 1);

          localStorage.setItem("users", JSON.stringify(users));
        }
      });
    }
  });
}
function taskComplete(event) {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let task_cmp = activeUser.todos;

  task_cmp.forEach((task) => {
    if (task.description === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("activeUser", JSON.stringify(activeUser));
  debugger;
  //

  event.nextElementSibling.classList.toggle("completed");
}
