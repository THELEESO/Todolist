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
      todoItem.remove();
    });
  });

  todo.appendChild(checkmark);
  todo.appendChild(trash);

  // use keyframe animation with JS
  todo.style.animation = "scaleUp 0.3s forwards";

  // clear input
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
  section.appendChild(todo);
});
