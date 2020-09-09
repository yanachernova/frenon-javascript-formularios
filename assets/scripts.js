const USERS = "";
const ALL_USERS = getUsers();

const addUser = (e) => {
  e.preventDefault();
  const users = getUsers();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  if(name == "" || email ==""){
      alert('Enter Name or Email')
  }else{
    const newUsers = [...users, { name, email }];
    localStorage.setItem(USERS, JSON.stringify(newUsers));
    toJoin({ name, email }, newUsers.length - 1);
    reset()
  }
  
}

const toJoin = (user, i) =>{
  const list = document.getElementById("list");
  const item = document.createElement("li");
  item.innerHTML = `<a href="#" onclick="deleteUser(event,${i})">
  <ion-icon name="trash-outline"></ion-icon>
  ${user.name}(${user.email})
</a>`;
  list.appendChild(item);
}

const deleteUser = (e, index) => {
  e.preventDefault();
  const users = getUsers();
  const updatedList = [
    ...users.slice(0, index),
    ...users.slice(index + 1),
  ];
  localStorage.setItem(USERS, JSON.stringify(updatedList));

  updateUsers(updatedList);
};

function getUsers(){
  return JSON.parse(localStorage.getItem(USERS))
    ? JSON.parse(localStorage.getItem(USERS))
    : [];
}

const reset = () =>{
    document.getElementById("frm").reset();
}

const updateUsers = (users) => {
  const ul = document.getElementById("list");
  ul.innerHTML = "";
  if (users) {
    users.forEach((user, i) => {
      toJoin(user, i);
    });
  } else {
    if (ALL_USERS.length) {
      ALL_USERS.forEach((user, item) => {
        toJoin(user, item);
      });
    }
  }
  notifications();
}

const notifications = () =>{
  const span = document.getElementById("notification");
  if (!getUsers().length) {
    span.innerHTML = "Que esperas, Ingresa un usuario";
  } else {
    span.innerHTML = "";
  }
}


window.onload =  () => {
  updateUsers();
};