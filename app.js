let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", (e) => {
  // 為了方便測試，先暫時讓submit button失效
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
  section.appendChild(todo);
});
