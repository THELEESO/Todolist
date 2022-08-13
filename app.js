let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", (e) => {
  // 為了方便測試，先暫時讓submit button失效
  // 這也會造成input內容設定的 max min required都會失效！
  e.preventDefault();

  // get value from FORM
  // console.log(e.target.parentElement);
  let form = e.target.parentElement;
  // 可以在 console 找到 value 值
  //  console.log(form.children);
  let todoText = form.children[0].value;
  //  console.log(todotext);
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "" || todoMonth === "" || todoDate === "") {
    alert("You miss something!");
    // 如果沒下return 會沒辦法中斷 callback function，還是會生成list
    return;
  }

  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("time");
  time.innerText = todoMonth + " / " + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);

  // create check, trash button
  let checkmark = document.createElement("button");
  checkmark.classList.add("complete");
  checkmark.innerHTML = '<i class="fa-solid fa-check"></i>';

  checkmark.addEventListener("click", (e) => {
    // console.log(e.target.parentElement);
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trash = document.createElement("button");
  trash.classList.add("delete");
  trash.innerHTML = '<i class="fa-solid fa-trash"></i>';

  trash.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.style.animation = "scaleDown 0.3s forwards";
    //必須加入新的listener不然會直接remove() 不會等到動畫跑完
    todoItem.addEventListener("animationend", () => {
      // remove from local storage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          //如果mylistArray的todotext 和 要被刪除的 text相同
          myListArray.splice(index, 1); // index值就會等forEach上所找的那個物件的index值，並刪除
          localStorage.setItem("list", JSON.stringify(myListArray)); //刪除後更新local storage
        }
      });
      todoItem.remove();
    });
  });

  todo.appendChild(checkmark);
  todo.appendChild(trash);

  // use keyframe animation with JS
  todo.style.animation = "scaleUp 0.3s forwards";

  // create object
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };
  // store data into array of object
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  console.log(JSON.parse(myList));

  // clear input
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";

  section.appendChild(todo);
});

let myList = localStorage.getItem("list");
if (myList !== null) {
  let myListArray = JSON.parse(myList);
  myListArray.forEach((item) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("text");
    // item中拿取這個物件內容
    text.innerText = item.todoText;
    let time = document.createElement("p");
    time.classList.add("time");
    time.innerText = item.todoMonth + " / " + item.todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    // create check, trash button
    let checkmark = document.createElement("button");
    checkmark.classList.add("complete");
    checkmark.innerHTML = '<i class="fa-solid fa-check"></i>';

    checkmark.addEventListener("click", (e) => {
      // console.log(e.target.parentElement);
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle("done");
    });

    let trash = document.createElement("button");
    trash.classList.add("delete");
    trash.innerHTML = '<i class="fa-solid fa-trash"></i>';

    trash.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      todoItem.style.animation = "scaleDown 0.3s forwards";
      //必須加入新的listener不然會直接remove() 不會等到動畫跑完
      todoItem.addEventListener("animationend", () => {
        // remove from local storage
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });

        todoItem.remove();
      });
    });

    todo.appendChild(checkmark);
    todo.appendChild(trash);

    section.appendChild(todo);
  });
}
